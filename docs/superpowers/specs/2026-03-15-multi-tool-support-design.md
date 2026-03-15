# Multi-Tool Support for SkillKit Installer

**Date:** 2026-03-15
**Status:** Approved

## Background

The SkillKit installer (`npx @rfxlamia/skillkit`) currently only installs skills to Claude Code paths (`~/.claude/skills/`). The repo was renamed from `claude-skillkit` to `skillkit` to signal multi-tool intent, but the installer never followed through. This spec adds support for OpenAI Codex, OpenCode, and GitHub Copilot.

## Supported Tools & Paths

| Tool | Skills (user) | Skills (project) | Agents (user) | Agents (project) |
|------|--------------|-----------------|---------------|-----------------|
| Claude Code | `~/.claude/skills/` | `.claude/skills/` | `~/.claude/agents/` | `.claude/agents/` |
| OpenCode | `~/.config/opencode/skills/skillkit/` | `.opencode/skills/` | `~/.config/opencode/agents/` | `.opencode/agents/` |
| Copilot | `~/.copilot/skills/` | *(none)* | `~/.claude/agents/` | `.github/agents/` |
| Codex | `~/.agents/skills/skillkit/` | *(none)* | *(skip)* | *(skip)* |

**Codex agents note:** Codex does not natively load agent definition files via `spawn_agent`. Agents are skipped for Codex.

**Copilot agents note:** Copilot shares `~/.claude/agents/` with Claude Code for user scope. Project scope uses `.github/agents/`.

## New CLI Flow

```
Banner + update check              (unchanged)
intro('SkillKit Installer')        (unchanged)
   ↓
[NEW] selectTools()                multiselect: Claude Code, OpenCode, Codex, Copilot
   ↓
selectScope()                      user / project
                                   → if Codex selected: warn "Codex is always user-scoped"
   ↓
pickInstallables()                 unchanged (skills/agents picker)
   ↓
installSelected(selected, targets[])   install to each target
   ↓
outro: "X item(s) installed to Claude Code (user), OpenCode (project)."
log.info: "Restart your coding agent tools to pick up new skills."
```

## Components

### `src/tools.js` (new file)

Two exported functions:

**`selectTools()`** — interactive multiselect returning `string[]` of tool IDs (`claude-code`, `opencode`, `codex`, `copilot`).

**`getToolTargets(selectedTools, scope)`** — pure function, maps tool IDs + scope to a `Target[]`:

```js
Target = {
  name: string,        // display name e.g. "Claude Code"
  skillsDir: string,   // absolute path
  agentsDir: string | null  // null means skip agents
}
```

Mapping rules:
- `claude-code`: respects scope (user/project)
- `opencode`: respects scope (user → `~/.config/opencode/`, project → `.opencode/`)
- `codex`: always user scope regardless of selected scope; `agentsDir: null`
- `copilot`: skills always `~/.copilot/skills/`; agents: user → `~/.claude/agents/`, project → `.github/agents/`

### `src/cli.js` (modified)

- Add `selectTools()` call between `intro` and `selectScope()`
- Pass `targets` array to `installSelected()`
- Update `outro` message to list tool names and installed count
- Update `log.info` to generic restart message

### `src/scope.js` (modified)

- Accept `selectedTools` parameter
- If `codex` is in `selectedTools` and user picks project scope, log a warning: `"Codex does not support project scope — skills will be installed to ~/.agents/skills/skillkit/"`

### `src/install.js` (modified)

Signature change:

```js
// before
installSelected({ skills, agents }, { skillsDir, agentsDir })

// after
installSelected({ skills, agents }, targets[])
```

Iterates over each `Target`, copies skills to `target.skillsDir` and agents to `target.agentsDir` (skipped if `null`). Returns total installed count across all targets.

**Path deduplication:** if two targets resolve to the same `agentsDir` (e.g. Copilot user + Claude Code user both → `~/.claude/agents/`), install once, not twice.

### `src/picker.js` (modified)

- Sort skills list: `skillkit` always first, then alphabetical by name
- Update "Everything" label to reflect current manifest count dynamically

### `src/banner.js` (modified)

- Update subtitle from `"Claude Code Skills Installer"` to `"Multi-Tool Skills Installer"`

### `src/tools.test.js` (new file)

Unit tests for `getToolTargets()`:
- Claude Code user scope → correct paths
- Claude Code project scope → correct paths
- Codex always resolves to user scope regardless of input scope
- Codex agentsDir is null
- Copilot user → skills to `~/.copilot/skills/`, agents to `~/.claude/agents/`
- Copilot project → agents to `.github/agents/`
- OpenCode user → `~/.config/opencode/` paths
- OpenCode project → `.opencode/` paths

## Data Flow

```
selectTools()          → string[]           e.g. ['claude-code', 'opencode']
     ↓
selectScope()          → 'user' | 'project'
     ↓
getToolTargets()       → Target[]
     ↓
installSelected()      → for each target:
                           copy skills → target.skillsDir/
                           copy agents → target.agentsDir/ (skip if null)
                         → { installed, skipped }
```

## Edge Cases

| Case | Handling |
|------|----------|
| Codex + project scope selected | Silent override to user scope + warning log |
| Copilot + Claude Code both selected (user) | `agentsDir` deduped — agents installed once to `~/.claude/agents/` |
| Copilot project scope + skills | Copilot has no project scope for skills → always `~/.copilot/skills/` |
| No tools selected (cancel) | `isCancel` check, exit with message |

## Files Changed

| File | Action |
|------|--------|
| `src/tools.js` | Create |
| `src/tools.test.js` | Create |
| `src/cli.js` | Modify |
| `src/scope.js` | Modify |
| `src/install.js` | Modify |
| `src/picker.js` | Modify |
| `src/banner.js` | Modify |
