import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))


def test_behavioral_score_calculation():
    from quality_scorer import QualityScorer

    scorer = QualityScorer()
    structural_score = 9.0
    behavioral_score = 8.0

    result = scorer.calculate_final_score(structural_score, behavioral_score)
    expected = (9.0 * 0.6) + (8.0 * 0.4)  # 8.6
    assert abs(result["final_score"] - expected) < 0.01
    assert result["mode"] == "full"
    assert result["structural_score"] == structural_score
    assert result["behavioral_score"] == behavioral_score
