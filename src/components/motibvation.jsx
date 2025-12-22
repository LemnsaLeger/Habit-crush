
import { Brain, Shield, Sparkles, Bell, Circle } from "lucide-react";
const MotivationSetup = () => {
  const options = [
    { id: "pre", label: "Pre-mortem obstacles", icon: Brain },
    { id: "emergency", label: "Emergency plans", icon: Shield },
    { id: "success", label: "Custom success messages", icon: Sparkles },
  ];

  return (
    <div className="flex items-center justify-center p-6 min-h-screen w-full">
      <div className="motivation-container relative w-300 max-w-400 p-8 md:p-10">
        {/* Step Badge */}
        <div className="motivation-badge absolute -top-3 -left-3 w-10 h-10 rounded-2xl flex items-center justify-center text-xl font-bold">
          6
        </div>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Habit Motivation Setup</h1>
          <p className="motivation-text-muted text-sm leading-relaxed">
            Configure psychological reinforcement elements to help you stay on
            track. These tools are designed to boost your motivation and handle
            setbacks.
          </p>
        </header>

        {/* Motivation Options */}
        <div className="space-y-3 mb-6">
          {options.map((opt) => (
            <div
              key={opt.id}
              className="motivation-option-row flex items-center gap-4 p-4 rounded-xl cursor-pointer"
            >
              <opt.icon size={20} className="motivation-icon-accent" />
              <Circle size={18} className="motivation-text-muted opacity-20" />
              <span className="text-sm motivation-text-muted font-medium">
                {opt.label}
              </span>
            </div>
          ))}
        </div>

        {/* Contextual Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button className="motivation-action-btn flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold">
            <Sparkles size={14} className="motivation-icon-accent" /> Set Custom
            Success Message
          </button>
          <button className="motivation-action-btn flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold">
            <Bell size={14} className="motivation-icon-accent" /> Set Gentle
            Reminder Message
          </button>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-row-reverse items-center gap-4">
          <button className="motivation-btn-finish flex-1 py-3 rounded-xl font-bold text-sm transition-all">
            Finish: Create Habit
          </button>
          <button className="motivation-btn-back px-6 py-3 rounded-xl font-bold text-sm transition-all">
            Back: Configure Frequency
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotivationSetup;