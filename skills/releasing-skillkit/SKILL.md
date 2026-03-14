---
name: releasing-skillkit
description: >
  Complete release checklist for SkillKit project. Performs pre-release verification,
  version bumping, changelog generation, git tagging, and npm publishing for both
  the main project and the installer package. Ensures all tests pass, manifest is
  current, and release artifacts are properly published.

  USE WHEN: Preparing to release a new version of SkillKit or the npm installer,
  bumping versions, creating git tags, or publishing to npm.
category: deployment
---

# Releasing SkillKit

## Overview

This skill automates the complete release workflow for the SkillKit project, covering:
- Main project releases (git tags, GitHub releases)
- npm installer package releases (`@rfxlamia/skillkit`)
- Pre-release verification checklist
- Version bumping and changelog updates

## Release Types

| Type | When to Use | Example |
|------|-------------|---------|
| **patch** | Bug fixes, minor corrections | `2.2.0` → `2.2.1` |
| **minor** | New features, backward compatible | `2.2.0` → `2.3.0` |
| **major** | Breaking changes | `2.2.0` → `3.0.0` |

## Workflow

### Phase 1: Pre-Release Checks (STOP if any fail)

**G1: Working Tree Clean**
```bash
git status --porcelain
```
- Expected: No output (clean working tree)
- If dirty: Commit or stash changes first

**G2: On Main Branch**
```bash
git branch --show-current
```
- Expected: `main`
- If not: Switch to main or document why releasing from another branch

**G3: Tests Pass**
```bash
cd installer && npm test
```
- Expected: All tests pass (14 tests)
- If fail: Fix before releasing

**G4: Manifest Current**
```bash
node scripts/generate-manifest.js
git diff --exit-code installer/skills-manifest.json
```
- Expected: No diff (manifest up to date)
- If diff: Commit regenerated manifest

**G5: npm Login Valid** (for installer releases)
```bash
npm whoami
```
- Expected: Username printed
- If error: Run `npm login` first

### Phase 2: Determine Release Scope

**Decision Matrix:**

| What Changed | Release Type | Files to Update |
|--------------|--------------|-----------------|
| Skills/agents content only | patch | `installer/package.json`, publish npm |
| Installer bug fix | patch | `installer/package.json`, publish npm |
| Installer new feature | minor | `installer/package.json`, publish npm |
| Core skill changes | minor | `.claude-plugin/plugin.json`, git tag |
| Breaking changes | major | `.claude-plugin/plugin.json`, git tag |

### Phase 3: Main Project Release

**Step 1: Update Version**
```bash
# Edit .claude-plugin/plugin.json
# Change "version": "X.Y.Z" to new version
```

**Step 2: Update Changelog**
```bash
# Prepend to CHANGELOG.md:
## [X.Y.Z] - YYYY-MM-DD

### Added/Fixed/Changed
- Description of changes
```

**Step 3: Commit**
```bash
git add -A
git commit -m "chore(release): vX.Y.Z"
```

**Step 4: Tag**
```bash
git tag -a "vX.Y.Z" -m "Release vX.Y.Z"
```

**Step 5: Push**
```bash
git push origin main
git push origin vX.Y.Z
```

**Step 6: GitHub Release**
```bash
gh release create "vX.Y.Z" \
  --title "vX.Y.Z" \
  --notes "Release notes here" \
  --latest
```

### Phase 4: npm Installer Release

**Step 1: Version Bump**
```bash
cd installer
npm version <patch|minor|major>  # This updates package.json
```

**Step 2: Verify prepublishOnly**
- Ensure `scripts/generate-manifest.js` exists and works
- Ensure `skills/` and `agents/` folders exist at repo root

**Step 3: Publish**
```bash
cd installer
npm publish --access public
```

**Step 4: Verify**
```bash
npm view @rfxlamia/skillkit version
npx @rfxlamia/skillkit  # Test the live package
```

## Quick Reference

### Release Main Project Only
```bash
# Update .claude-plugin/plugin.json version
# Update CHANGELOG.md
git add -A
git commit -m "chore(release): v2.3.0"
git tag -a "v2.3.0" -m "Release v2.3.0"
git push origin main && git push origin v2.3.0
gh release create "v2.3.0" --title "v2.3.0" --notes "..." --latest
```

### Release npm Installer Only
```bash
cd installer
npm version patch  # or minor/major
npm publish --access public
```

### Release Both (Full Release)
```bash
# 1. Main project
code .claude-plugin/plugin.json  # bump version
code CHANGELOG.md                # add entry
git add -A
git commit -m "chore(release): v2.3.0"
git tag -a "v2.3.0" -m "Release v2.3.0"

# 2. npm installer
cd installer
npm version minor  # match main project bump type
npm publish --access public
cd ..

# 3. Push everything
git push origin main
git push origin v2.3.0
gh release create "v2.3.0" --title "v2.3.0" --notes "..." --latest
```

## Verification Commands

```bash
# Verify git tag exists
git ls-remote --tags origin "vX.Y.Z"

# Verify GitHub release
gh release view "vX.Y.Z"

# Verify npm package
npm view @rfxlamia/skillkit

# Test live installer
npx @rfxlamia/skillkit
```

## Error Recovery

| Error | Solution |
|-------|----------|
| `npm publish` fails with 403 | Run `npm login` and retry |
| `git push` rejected | `git pull --rebase` then retry |
| Tag already exists | `git tag -d vX.Y.Z` then recreate |
| Manifest out of date | `node scripts/generate-manifest.js` and commit |
| Tests fail | Fix issues, cannot release with failing tests |

## Post-Release Checklist

- [ ] GitHub release page shows correct version
- [ ] npm package shows new version (`npm view @rfxlamia/skillkit version`)
- [ ] Installer runs successfully (`npx @rfxlamia/skillkit` shows banner)
- [ ] Main branch has version bump commit
- [ ] Tag points to correct commit
- [ ] CHANGELOG.md updated
