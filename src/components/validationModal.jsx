import { useEffect, useState } from "react";
import ResultModal from "./resultModal";
import { getFeedback } from "../helpers/getFeedback";

export default function ValidationModal({ validation }) {
  const [modalConfig, setModalConfig] = useState(null);
  const [resultModal, setResultModal] = useState(false);

  useEffect(() => {
    if (validation) {
      const feedback = getFeedback(validation.summary);
      const randomMsg =
        feedback.messages[
          Math.floor(Math.random() * feedback.messages.length)
        ];

      const score = `${validation.summary.correctAnswers}/${validation.summary.totalQuestions} aciertos (${validation.summary.percentage}%)`;

      setModalConfig({
        type: feedback.type,
        title: feedback.title,
        message: randomMsg,
        score
      });

      setResultModal(true);
    }
  }, [validation]);

  if (!modalConfig) return null;

  return (
    <ResultModal
      type={modalConfig.type}
      title={modalConfig.title}
      message={modalConfig.message}
      score={modalConfig.score}
      isOpen={resultModal}
      onClose={() => setResultModal(false)}
    />
  );
}
