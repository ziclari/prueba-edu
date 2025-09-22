import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function ResultModal({ type = "neutral",title, message, score, onClose, isOpen }) {
  const config = {
    correct: {
      color: "text-green-700",
      icon: "mdi:check-circle",
      sound: "/sounds/correct.mp3",
    },
    incorrect: {
      color: "text-gray-300",
      icon: "mdi:close-circle",
      sound: "/sounds/incorrect.mp3",
    },
    neutral: {
      color: "text-gray-500",
      icon: "mdi:minus-circle",
      sound: "/sounds/neutral.mp3",
    },
  };

  const { color, icon, sound } = config[type] || config.neutral;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const audio = new Audio(sound);
      audio.play().catch(() => {});
    } else {

      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, sound]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 bottom-24 right-4 md:right-16 z-50 w-[90%] md:w-xl mx-auto md:mx-0">
        <div
            className={`
            relative
            flex flex-col md:flex-row items-center gap-3 px-4 py-3 rounded-xl border bg-white border-gray-200 shadow-md
            transform transition-all duration-300
            ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
        >
            <Icon icon={icon} width={40} height={40} className={`flex-shrink-0 ${color}`} />
            <div className="flex-1 space-y-2 mt-4 md:mt-0">
                <p className="font-bold font-primary text-lg md:text-xl">{title}</p>
                <p className="text-base md:text-lg font-primary">{message}</p>
                <p className="text-base md:text-lg font-primary text-gray-700">{score}</p>
            </div>
            <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute top-2 md:top-4 right-2 md:right-4 cursor-pointer"
            >
            <Icon icon="mdi:close" width={24} height={24} />
            </button>
        </div>
    </div>

  );
}
