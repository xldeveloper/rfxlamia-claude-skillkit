def test_mode_flag_accepts_fast_and_full():
    import subprocess

    result = subprocess.run(
        [
            "python3",
            "skills/skillkit/scripts/decision_helper.py",
            "--mode",
            "full",
            "--show-criteria",
        ],
        capture_output=True,
        text=True,
        cwd="/home/v/project/claude-skillkit/.worktrees/skillkit-v2-tdd-integration",
    )

    # Should not error on --mode flag
    assert result.returncode == 0
    assert "unrecognized" not in result.stderr
