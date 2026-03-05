---
title: "Behavioral Testing with pressure_tester.py"
purpose: "Guide for testing skill compliance under pressure conditions"
tool_name: "pressure_tester.py"
tool_type: "validation-layer"
read_priority: "high"
read_when:
  - "Using full-mode workflow"
  - "Creating discipline-enforcing skills"
  - "Testing skill effectiveness"
  - "After writing skill content"
---

# Behavioral Testing Guide

## Overview

Behavioral testing validates that agents actually FOLLOW skills under pressure, not just understand them.

**Two testing modes:**
- **RED (Baseline):** Test WITHOUT skill and document failures
- **GREEN (Verification):** Test WITH skill and verify compliance

## Pressure Types

| Type | Scenario Example | What It Tests |
|------|------------------|---------------|
| **Time** | "I need this NOW!" | Shortcuts under deadline |
| **Sunk Cost** | "Already wrote 100 lines" | Willingness to delete code |
| **Authority** | "Manager says skip tests" | Independence from authority |
| **Exhaustion** | "It's 2 AM..." | Discipline when tired |
| **Combined** | All pressures at once | Real-world complexity |

## Usage

### Mode 1: Baseline (RED)

```bash
python3 scripts/pressure_tester.py /path/to/skill \
  --pressure combined \
  --skill-type discipline \
  --format json
```

Document rationalizations found.

### Mode 2: Verification (GREEN)

```bash
python3 scripts/pressure_tester.py /path/to/skill \
  --pressure combined \
  --skill-type discipline \
  --format json
```

Score >= 7.0 = PASS.

## Interpreting Results

```json
{
  "status": "needs_improvement",
  "compliance_score": 5.5,
  "rationalizations_found": [
    "'I'll test after' - Tests-after proves nothing",
    "'Too simple to test' - Simple code breaks"
  ],
  "fixes_needed": [
    "Add explicit counter for 'test after' rationalization",
    "Add red flags section"
  ]
}
```

## Common Rationalizations

| Excuse | Counter |
|--------|---------|
| "Too simple" | Simple code breaks |
| "I'll test after" | Tests-after proves nothing |
| "Following spirit" | Letter = Spirit |
| "Just this once" | No exceptions |

## Integration with Quality Score

Full mode uses a 60/40 split:
- 60% structural (existing validation)
- 40% behavioral (pressure testing)

Target: 9.0+ combined
