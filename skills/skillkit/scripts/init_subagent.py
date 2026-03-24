#!/usr/bin/env python3
"""
DEPRECATED in v2.6: Use init.py instead.

Previous: Created subagent .md file from template
Now: Use init.py subagent <name> --path <path>
"""

import sys


def main():
    print(
        "DEPRECATED: init_subagent.py has been superseded by init.py\n"
        "\n"
        "Use instead:\n"
        "  python scripts/init.py subagent <name> --path <path>\n"
        "\n"
        "Example:\n"
        "  python scripts/init.py subagent code-reviewer --path ~/.claude/agents",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    sys.exit(main())
