import { feedbackConfig } from "../data/feedbackConfig";

export function getFeedback(summary) {
  const { correctAnswers, totalQuestions } = summary;

  if (correctAnswers === totalQuestions) {
    return { type: "correct", ...feedbackConfig.correct };
  }
  if (correctAnswers === 0 || correctAnswers < 5) {
    return { type: "incorrect", ...feedbackConfig.incorrect };
  }
  if (correctAnswers >= 5) {
    return { type: "neutral", ...feedbackConfig.neutral };
  }

  return { type: "neutral", ...feedbackConfig.neutral };
}