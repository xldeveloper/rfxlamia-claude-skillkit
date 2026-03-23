#!/usr/bin/env python3
"""
DEPRECATED in v2.6: Use init.py instead.

Previous: Created skill directory with template SKILL.md
Now: Use init.py skill <name> --path <path> [--mode fast|full]
"""

import sys


def main():
    print(
        "DEPRECATED: init_skill.py has been superseded by init.py\n"
        "\n"
        "Use instead:\n"
        "  python scripts/init.py skill <name> --path <path> [--mode fast|full]\n"
        "\n"
        "Example:\n"
        "  python scripts/init.py skill my-skill --path skills/ --mode fast",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    sys.exit(main())
