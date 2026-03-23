#!/usr/bin/env python3
"""
DEPRECATED in v2.6: Use validate_skill.py --security-only instead.

Previous: Comprehensive security vulnerability scanner
Now: Use validate_skill.py with --security-only flag

Example:
    python scripts/validate_skill.py skill-name/ --security-only --format json
"""

import sys


def main():
    print(
        "DEPRECATED: security_scanner.py has been superseded by validate_skill.py\n"
        "\n"
        "Use instead:\n"
        "  python scripts/validate_skill.py <skill-path> --security-only [--format json]\n"
        "\n"
        "Example:\n"
        "  python scripts/validate_skill.py my-skill/ --security-only --format json",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    sys.exit(main())
