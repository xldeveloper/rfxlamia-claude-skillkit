#!/usr/bin/env python3
"""
DEPRECATED in v2.6: Use validate_skill.py --tokens-only instead.

Previous: Token cost estimation tool
Now: Use validate_skill.py with --tokens-only flag

Example:
    python scripts/validate_skill.py skill-name/ --tokens-only --format json
"""

import sys


def main():
    print(
        "DEPRECATED: token_estimator.py has been superseded by validate_skill.py\n"
        "\n"
        "Use instead:\n"
        "  python scripts/validate_skill.py <skill-path> --tokens-only [--format json]\n"
        "\n"
        "Example:\n"
        "  python scripts/validate_skill.py my-skill/ --tokens-only --format json",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    sys.exit(main())
