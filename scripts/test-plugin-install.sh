#!/bin/bash
# Test plugin installation locally

set -e

echo "Testing plugin structure..."

# Check commands exist
if [ ! -d "commands" ]; then
    echo "ERROR: commands/ folder missing"
    exit 1
fi

echo "✓ commands/ folder exists"

# Check bundles have skills
for bundle in frameworks essentials creative; do
    if [ ! -d "bundles/$bundle/skills" ]; then
        echo "ERROR: bundles/$bundle/skills/ missing"
        exit 1
    fi
    count=$(find bundles/$bundle/skills -name "SKILL.md" | wc -l)
    echo "✓ bundles/$bundle/skills/ has $count SKILL.md files"
done

# Check subagents bundle
if [ ! -d "bundles/subagents/agents" ]; then
    echo "ERROR: bundles/subagents/agents/ missing"
    exit 1
fi
agent_count=$(ls bundles/subagents/agents/*.md 2>/dev/null | wc -l)
echo "✓ bundles/subagents/agents/ has $agent_count agent files"

# Check marketplace.json exists
if [ ! -f ".claude-plugin/marketplace.json" ]; then
    echo "ERROR: marketplace.json missing"
    exit 1
fi
echo "✓ .claude-plugin/marketplace.json exists"

echo ""
echo "All checks passed!"
