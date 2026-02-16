import {
  Calendar,
  Repeat,
  RotateCcw,
  CalendarDays,
  CheckCircle2,
  Circle,
  X,
} from "lucide-react";
import "../index.css";
import { useState } from "react";

const HabitFrequencyConfigurator = ({ habit, active, setHabit, onNext, onBack }) => {

  const selected = habit.frequency || "daily";
  const [customInput, setCustomInput] = useState(habit.frequency_custom || "");

  const DAYS_OF_WEEK = [
    { id: 0, label: "Sun" },
    { id: 1, label: "Mon" },
    { id: 2, label: "Tue" },
    { id: 3, label: "Wed" },
    { id: 4, label: "Thu" },
    { id: 5, label: "Fri" },
    { id: 6, label: "Sat" },
  ];

  const options = [
    { id: "daily", label: "Daily (Every day)", icon: Calendar, description: "Perform this habit every single day" },
    { id: "weekly", label: "X times per week", icon: Repeat, description: "Choose specific days of the week" },
    { id: "custom", label: "Custom frequency", icon: RotateCcw, description: "Set a custom interval" },
  ];

  const isValid = Boolean(selected) && (
    selected === "daily" || 
    (selected === "weekly" && Array.isArray(customInput) && customInput.length > 0) ||
    (selected === "custom" && customInput)
  );

  // Handle day selection for weekly
  const toggleDaySelection = (dayId) => {
    const currentDays = Array.isArray(customInput) ? customInput : [];
    const updated = currentDays.includes(dayId)
      ? currentDays.filter(d => d !== dayId)
      : [...currentDays, dayId];
    setCustomInput(updated);
    setHabit({ ...habit, frequency_custom: updated });
  };

  // Handle frequency selection
  const handleFrequencySelect = (frequencyId) => {
    let updatedCustomInput = customInput;
    
    if (frequencyId === "daily") {
      updatedCustomInput = "";
    } else if (frequencyId === "weekly" && !Array.isArray(customInput)) {
      updatedCustomInput = [];
    } else if (frequencyId === "custom" && Array.isArray(customInput)) {
      updatedCustomInput = "";
    }
    
    setCustomInput(updatedCustomInput);
    setHabit({ ...habit, frequency: frequencyId, frequency_custom: updatedCustomInput });
  };

  return (
    <div
      className={` flex items-center justify-center min-h-screen h-full p-4 mt-20`}
    >
      <div className="habit-config-container relative w-300 max-w-500 p-8">
        {/* Step Badge */}
        <div
          className={` ${
            active
              ? "bg-[hsl(var(--accent))] shadow-teal-300"
              : "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]"
          } step-badge absolute -top-4 -left-4 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl `}
        >
          5
        </div>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Habit Frequency Configurator
          </h1>
          <p className="habit-text-muted text-sm leading-relaxed">
            Define how often you want to perform this habit. Choose from various
            scheduling options to match your lifestyle.
          </p>
        </header>

        {/* Frequency Options */}
        <div className="flex flex-col gap-3 mb-8">
          {options.map((option) => (
            <div key={option.id}>
              <button
                onClick={() => handleFrequencySelect(option.id)}
                className={`frequency-option flex items-center gap-4 p-4 rounded-xl text-left w-full ${
                  selected === option.id ? "active ring-2 ring-[hsl(var(--accent))]" : "border border-[hsl(var(--border))]"
                }`}
                style={selected === option.id ? { background: "var(--gradient-card)" } : {}}
              >
                <option.icon
                  className={
                    selected === option.id
                      ? "habit-text-accent"
                      : "habit-text-muted"
                  }
                  size={20}
                />

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    {selected === option.id ? (
                      <CheckCircle2 className="habit-text-accent" size={18} />
                    ) : (
                      <Circle className="habit-text-muted opacity-30" size={18} />
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        selected === option.id ? "text-white" : "habit-text-muted"
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] ml-7">
                    {option.description}
                  </p>
                </div>
              </button>

              {/* Conditional Input for Weekly */}
              {selected === option.id && option.id === "weekly" && (
                <div className="mt-4 p-4 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))]">
                  <p className="text-sm font-semibold mb-3 text-[hsl(var(--foreground))]">
                    Select days of the week:
                  </p>
                  <div className="grid grid-cols-7 gap-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <button
                        key={day.id}
                        onClick={() => toggleDaySelection(day.id)}
                        className={`p-2 rounded-lg text-sm font-semibold transition-all ${
                          Array.isArray(customInput) && customInput.includes(day.id)
                            ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
                            : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--input))]"
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-3">
                    Selected: {Array.isArray(customInput) && customInput.length > 0 
                      ? `${customInput.length} day(s)` 
                      : "No days selected"}
                  </p>
                </div>
              )}

              {/* Conditional Input for Custom */}
              {selected === option.id && option.id === "custom" && (
                <div className="mt-4 p-4 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))]">
                  <label className="text-sm font-semibold mb-2 block text-[hsl(var(--foreground))]">
                    Custom frequency (e.g., "3 times per week", "Every Monday", "Twice daily")
                  </label>
                  <input
                    type="text"
                    value={typeof customInput === 'string' ? customInput : ''}
                    onChange={(e) => {
                      setCustomInput(e.target.value);
                      setHabit({ ...habit, frequency_custom: e.target.value });
                    }}
                    placeholder="Enter custom frequency..."
                    className="w-full bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))] text-[hsl(var(--foreground))]"
                  />
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                    💡 Tip: Be specific! Examples: "Monday & Thursday", "Every other day", "3x per week"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Visual Summary */}
        <div className="summary-box p-5 rounded-xl mb-10 bg-[hsl(var(--secondary))] border border-[hsl(var(--border))]">
          <span className="habit-text-muted text-[10px] uppercase font-bold tracking-widest block mb-1">
            Frequency Summary
          </span>
          <p className="text-lg font-semibold flex items-center gap-2 text-[hsl(var(--foreground))]">
            {(() => {
              if (selected === "daily") return "Every day";
              if (selected === "weekly" && Array.isArray(customInput) && customInput.length > 0) {
                const dayNames = customInput
                  .sort()
                  .map(d => DAYS_OF_WEEK.find(day => day.id === d)?.label)
                  .join(", ");
                return `${dayNames}`;
              }
              if (selected === "custom" && typeof customInput === 'string') return customInput;
              return "Not configured yet";
            })()}
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
          </p>
        </div>

        {/* Validation Message */}
        {!isValid && (
          <div className="p-3 rounded-lg bg-[hsl(var(--destructive)/0.1)] border border-[hsl(var(--destructive)/0.3)] mb-4">
            <p className="text-sm text-[hsl(var(--destructive))] font-semibold">
              ⚠️ Please configure your frequency before proceeding
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-row-reverse items-center justify-between gap-4">
          <button
            className={`btn-next flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all active:scale-95 ${
              !isValid ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
            style={{
              background: isValid ? "var(--gradient-primary)" : "var(--gradient-primary)",
            }}
            onClick={onNext}
            disabled={!isValid}
          >
            Setup Motivation
          </button>
          <button
            className="btn-back px-8 py-3 rounded-xl font-bold text-sm transition-colors bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]"
            onClick={onBack}
          >
            Select target
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitFrequencyConfigurator;
