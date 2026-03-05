# Migration Guide: v1.x to v2.0

## Breaking Changes

None. v2.0 is fully backward compatible.

## New Features Available

### 1. Dual-Mode Workflow

**Before (v1.x):**
```bash
python3 scripts/init_skill.py my-skill
# Only one workflow available
```

**After (v2.0):**
```bash
# Fast mode (original 12-step)
python3 scripts/init_skill.py my-skill --mode fast

# Full mode (15-step with behavioral testing)
python3 scripts/init_skill.py my-skill --mode full
```

### 2. Behavioral Testing

Test if agents actually follow your skill:

```bash
# Before writing skill - baseline
python3 scripts/pressure_tester.py my-skill/ --pressure combined

# After writing skill - verification
python3 scripts/pressure_tester.py my-skill/ --pressure combined
```

### 3. Enhanced Quality Scoring

```bash
# Fast mode (structural only)
python3 scripts/quality_scorer.py my-skill/

# Full mode (structural + behavioral)
python3 scripts/quality_scorer.py my-skill/ --behavioral --skill-type discipline
```

## When to Use Each Mode

| Scenario | Mode | Why |
|----------|------|-----|
| Simple utility | fast | Quick, sufficient validation |
| Discipline skill | full | Must resist rationalization |
| Production skill | full | Quality is critical |
| Prototype | fast | Speed matters |

## Default Behavior

- All tools default to `fast` mode
- Existing workflows continue unchanged
- Opt-in to full mode with `--mode full` or `--behavioral`
