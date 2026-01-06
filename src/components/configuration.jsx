import {
  Calendar,
  Repeat,
  RotateCcw,
  CalendarDays,
  CheckCircle2,
  Circle,
} from "lucide-react";
import "../index.css";

const HabitFrequencyConfigurator = ({ habit, active, setHabit, onNext, onBack }) => {

  const selected = habit.frequency || "daily";

  const options = [
    { id: "daily", label: "Daily (Every day)", icon: Calendar },
    { id: "weekly", label: "X times per week", icon: Repeat },
    { id: "rolling", label: "Rolling windows", icon: RotateCcw },
    { id: "specific", label: "Specific days of week", icon: CalendarDays },
  ];

  const isValid = Boolean(selected);

  return (
    <div
      className={`${
        active ? "ring-2 ring-[hsl(var(--border))]" : ""
      } flex items-center justify-center min-h-screen h-full p-4 -mt-20`}
    >
      <div className="habit-config-container relative w-300 max-w-400 p-8">
        {/* Step Badge */}
        <div className="step-badge absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
          5
        </div>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Habit Frequency Configurator
          </h1>
          <p className="habit-text-muted text-xl leading-relaxed">
            Define how often you want to perform this habit. Choose from various
            scheduling options to match your lifestyle.
          </p>
        </header>

        {/* Frequency Options */}
        <div className="flex flex-col gap-3 mb-8">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => 
                setHabit({...habit, frequency: option.id })
              }
              className={`frequency-option flex items-center gap-4 p-4 rounded-xl text-left ${
                selected === option.id ? "active" : ""
              }`}
            >
              <option.icon
                className={
                  selected === option.id
                    ? "habit-text-accent"
                    : "habit-text-muted"
                }
                size={20}
              />

              <div className="flex-1 flex items-center gap-3">
                {selected === option.id ? (
                  <CheckCircle2 className="habit-text-accent" size={18} />
                ) : (
                  <Circle className="habit-text-muted opacity-30" size={18} />
                )}
                <span
                  className={`text-xl font-medium ${
                    selected === option.id ? "text-white" : "habit-text-muted"
                  }`}
                >
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Visual Summary */}
        <div className="summary-box p-5 rounded-xl mb-10">
          <span className="habit-text-muted text-[10px] uppercase font-bold tracking-widest block mb-1">
            Visual Summary
          </span>
          <p className="text-xl font-semibold flex items-center gap-2">
            {options.find((option) => option.id === selected)?.label || "Not set"}
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-row-reverse items-center justify-between gap-4">
          <button className="btn-next flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all active:scale-95" onClick={onNext}
          disabled={!isValid}
          >
            Next: Setup Motivation
          </button>
          <button className="btn-back px-8 py-3 rounded-xl font-bold text-sm transition-colors" onClick={onBack}>
            Back: Set Target
          </button>
        </div>

        {/* Floating Progress Tracker */}
        <div className="progress-pill-container absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-2.5 rounded-full"></div>
      </div>
    </div>
  );
};

export default HabitFrequencyConfigurator;
