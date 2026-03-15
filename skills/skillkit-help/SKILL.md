---
name: skillkit-help
description: >
  Guided onboarding for new skill creators. Interactive path from zero to
  your first working skill. Covers what skills are, how to structure them,
  when to use skills vs subagents, and how to validate quality.
  Use for: create first skill, understand skills, validate an existing skill.
category: core
---

## Routing

Detect which path the user needs and jump directly to it.

| User says | Route |
|-----------|-------|
| "create", "build", "new skill", "first skill", "how do I" | → Path A |
| "validate", "check", "review my skill", "is this good" | → Path B |
| "what are skills", "how do skills work", "explain", "understand" | → Path C |
| Ambiguous | Ask: "Do you want to (A) create a skill, (B) validate one, or (C) understand how skills work?" |

---

## Path A: Create Your First Skill

**Goal:** Zero to working skill in ~10 minutes.

**Step 1 — Understand the structure**

Load and read in full: `knowledge/foundation/06-platform-constraints.md`

A skill is a Markdown file (`SKILL.md`) with a YAML frontmatter header and sections the agent reads on demand. Minimum required structure:

```
skills/your-skill-name/
  SKILL.md          ← required: the skill itself
```

**Step 2 — Define your skill**

Ask the user:
1. "What should your skill help with? (one sentence)"
2. "What keyword or phrase should trigger it? (e.g. 'debug', 'write tests', 'review PR')"
3. "Is this a rigid workflow (always follow steps in order) or flexible guidance (adapt to context)?"

**Step 3 — Check if it should be a skill**

Load and read: `knowledge/foundation/02-skills-vs-subagents-comparison.md`

Confirm: does the user need a skill (prompt-time instructions) or a subagent (separate agent with tools)? If subagent fits better, tell the user and point them to `/skillkit` → Section 6.

**Step 4 — Use the starter template**

Tell the user: "Start from the template at `skills/skillkit-help/template/SKILL.md`. Copy it to `skills/your-skill-name/SKILL.md` and fill in each section."

Open the template and walk through each annotated section with the user.

**Step 5 — Write the skill together**

Help the user write their `SKILL.md`. Apply rules from `knowledge/foundation/06-platform-constraints.md`:
- Frontmatter must have `name`, `description`, `category`
- Keep SKILL.md under 500 lines (split into reference files if needed)
- One clear trigger condition in the description
- At least one usage example

**Step 6 — Validate**

Load and read: `knowledge/application/12-testing-and-validation.md`

Run through the validation checklist with the user:
- [ ] Frontmatter complete (name, description, category)
- [ ] Trigger condition is unambiguous
- [ ] At least one concrete usage example
- [ ] No hardcoded credentials or PII
- [ ] Tested: invoke `/your-skill-name` in Claude Code and verify it fires

**Step 7 — Done**

Tell the user: "Your skill is ready. To share it with the community, open a PR to github.com/rfxlamia/skillkit — use the skill submission PR template."

---

## Path B: Validate an Existing Skill

**Goal:** Check an existing skill for quality issues before sharing or publishing.

**Step 1 — Load validation standards**

Load and read in full: `knowledge/application/12-testing-and-validation.md`

**Step 2 — Run the checklist**

Ask the user to share their `SKILL.md` content or path. Then check:

- [ ] Frontmatter: `name`, `description`, `category` all present
- [ ] Description has a clear trigger (when to invoke it)
- [ ] At least one concrete usage example in description or body
- [ ] No hardcoded secrets, API keys, or PII
- [ ] SKILL.md is under 500 lines (if over, recommend splitting)
- [ ] Sections are clearly delimited with `##` headings
- [ ] Invoke in Claude Code: does it fire correctly?

Report findings: pass/fail per item, specific fix for each failure.

---

## Path C: Understand How Skills Work

**Goal:** Build a mental model of skills — what they are, when to use them, how they fit into Claude Code.

**Step 1 — Why skills exist**

Load and read in full: `knowledge/foundation/01-why-skills-exist.md`

Summarize for the user: skills are reusable prompt-time instructions that extend Claude's behavior for specific tasks. They live in `~/.claude/skills/` and are invoked via `/skill-name`.

**Step 2 — Skills vs subagents**

Load and read: `knowledge/foundation/02-skills-vs-subagents-comparison.md`

Explain the difference with a concrete example:
- Skill: "When I type `/review-pr`, load these code review instructions"
- Subagent: "Spin up a separate agent with browser tools to scrape and summarize a URL"

**Step 3 — Decision framework**

Load and read: `knowledge/foundation/03-skills-vs-subagents-decision-tree.md`

Walk the user through the decision tree for their use case if they have one in mind.

**Step 4 — Offer next step**

"Want to create your first skill now? I can guide you through it (Path A above)."
