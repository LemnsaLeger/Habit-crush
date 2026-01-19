import React, { useState } from "react";
import {
  Brain,
  BookOpen,
  Dumbbell,
  Clock,
  Target,
  Sparkles,
} from "lucide-react";

export default function IconsOverlay({ selectedIcon, onSelectIcon }) {
  const [selected, setSelected] = useState(selectedIcon || "mind");

  const icons = [
    { id: "mind", Icon: Brain, label: "Mind" },
    { id: "read", Icon: BookOpen, label: "Read" },
    { id: "exercise", Icon: Dumbbell, label: "Exercise" },
    { id: "time", Icon: Clock, label: "Time" },
    { id: "goal", Icon: Target, label: "Goal" },
    { id: "habit", Icon: Sparkles, label: "Habit" },
  ];

  const handleSelect = (id) => {
    setSelected(id);
    if (onSelectIcon) {
      onSelectIcon(id);
    }
  };

  return (
    <div className="icons-overlay-container">
      {icons.map(({ id, Icon, label }) => (
        <button
          key={id}
          onClick={() => handleSelect(id)}
          className={`icon-option ${selected === id ? "selected" : ""}`}
          aria-label={label}
          aria-pressed={selected === id}
        >
          <Icon size={24} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
