import { Target } from 'lucide-react';

const HabitTargetInput = ({ active, habit, setHabit, onNext, onBack }) => {
  // Define unit suggestions per habit type
  const unitSuggestions = {
    time: ["minutes", "hours", "seconds"],
    quantity: {
      reading: ["pages", "chapters"],
      water: ["glasses", "liters", "ml"],
      exercise: ["reps", "km", "sets", "laps"],
      work: ["tasks", "items", "lines"],
      meditation: ["breaths"],
    },
    value: [],
  };

  // Get appropriate help text based on habit type
  const getHelpText = () => {
    switch (habit.type) {
      case "time":
        return "Set the duration target for this habit (e.g., 30 minutes of reading)";
      case "quantity":
        return "Set the quantity target and choose the unit you're tracking";
      case "value":
        return "Set a numeric target or milestone";
      default:
        return "Set your habit target";
    }
  };

  const isValid = habit.target.value && (habit.type === "time" || habit.target.unit);

  return (
    <div
      className={`${
        active ? "" : ""
      } flex items-center justify-center min-h-screen p-4 h-100 w-full`}
    >
      {/* Container */}
      <div className="relative w-400 h-auto p-8 rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        {/* Step Indicator */}
        <div
          className={` ${
            active
              ? "bg-[hsl(var(--accent))] shadow-teal-300"
              : "bg-[hsl(var(--muted))]"
          } absolute -top-3 -left-3 w-10 h-10 rounded-xl border border-[hsl(var(--border))] flex items-center justify-center text-xl font-bold text-[hsl(var(--foreground))] `}
        >
          4
        </div>

        {/* Header */}
        <header className="mb-8">
          <h2 className="text-2xl font-normal tracking-tight mb-2">
            Habit Target Input
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed opacity-80">
            {getHelpText()}
          </p>
        </header>

        {/* Time-Based Habit */}
        {habit.type === "time" && (
          <div className="flex items-center gap-5 p-5 mb-6 rounded-(--radius) border border-[hsl(var(--border))]" style={{ background: "var(--gradient-card)" }}>
            <div className="p-3 rounded-xl bg-[hsl(var(--primary)/0.15)]">
              <Target className="text-[hsl(var(--accent))]" size={24} />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-xl font-semibold mb-1">Duration</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={habit.target.value}
                  onChange={(e) =>
                    setHabit({
                      ...habit,
                      target: { ...habit.target, value: e.target.value, unit: "minutes" },
                    })
                  }
                  className="w-20 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                  placeholder="30"
                />
                <select
                  value={habit.target.unit || "minutes"}
                  onChange={(e) =>
                    setHabit({
                      ...habit,
                      target: { ...habit.target, unit: e.target.value },
                    })
                  }
                  className="bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                >
                  {unitSuggestions.time.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Quantity-Based Habit */}
        {habit.type === "quantity" && (
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-5 p-5 rounded-(--radius) border border-[hsl(var(--border))]" style={{ background: "var(--gradient-card)" }}>
              <div className="p-3 rounded-xl bg-[hsl(var(--primary)/0.15)]">
                <Target className="text-[hsl(var(--accent))]" size={24} />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-xl font-semibold mb-1">Quantity Target</label>
                <input
                  type="number"
                  min="1"
                  value={habit.target.value}
                  onChange={(e) =>
                    setHabit({
                      ...habit,
                      target: { ...habit.target, value: e.target.value },
                    })
                  }
                  className="w-full bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                  placeholder="8"
                />
              </div>
            </div>

            <div className="flex items-center gap-5 p-5 rounded-(--radius) border border-[hsl(var(--border))]" style={{ background: "var(--gradient-card)" }}>
              <div className="p-3 rounded-xl bg-[hsl(var(--primary)/0.15)]">
                <Target className="text-[hsl(var(--accent))]" size={24} />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-xl font-semibold mb-1">Unit</label>
                <div className="flex gap-2">
                  <select
                    value={habit.target.unit}
                    onChange={(e) =>
                      setHabit({
                        ...habit,
                        target: { ...habit.target, unit: e.target.value },
                      })
                    }
                    className="flex-1 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                  >
                    <option value="">Select or type custom unit</option>
                    <option value="pages">Pages</option>
                    <option value="glasses">Glasses</option>
                    <option value="reps">Reps</option>
                    <option value="km">Kilometers</option>
                    <option value="tasks">Tasks</option>
                    <option value="chapters">Chapters</option>
                    <option value="sets">Sets</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-(--radius) bg-[hsl(var(--primary)/0.05)] border border-[hsl(var(--primary)/0.1)] text-xs">
              <p className="text-[hsl(var(--muted-foreground))]">
                Or type a custom unit above (e.g., "liters", "items", "breaths")
              </p>
            </div>
          </div>
        )}

        {/* Value/Milestone Habit */}
        {habit.type === "value" && (
          <div className="flex items-center gap-5 p-5 mb-6 rounded-(--radius) border border-[hsl(var(--border))]" style={{ background: "var(--gradient-card)" }}>
            <div className="p-3 rounded-xl bg-[hsl(var(--primary)/0.15)]">
              <Target className="text-[hsl(var(--accent))]" size={24} />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-xl font-semibold mb-1">Target Value</label>
              <input
                type="number"
                min="1"
                value={habit.target.value}
                onChange={(e) =>
                  setHabit({
                    ...habit,
                    target: { ...habit.target, value: e.target.value },
                  })
                }
                className="w-full bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                placeholder="100"
              />
            </div>
          </div>
        )}

        {/* No Type Selected */}
        {!habit.type && (
          <div className="p-4 mb-8 rounded-(--radius) bg-[hsl(var(--primary)/0.05)] border border-[hsl(var(--primary)/0.1)] text-sm">
            <p className="text-[hsl(var(--accent))] font-semibold">
              Please select a habit type first
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-row-reverse gap-3">
          <button
            className={`flex-1 py-3 px-4 rounded-(--radius) font-semibold text-sm transition-all ${
              isValid
                ? "hover:opacity-90 active:scale-[0.98] cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "0 0 15px hsla(var(--primary-glow) / 0.25)",
            }}
            onClick={onNext}
            disabled={!isValid}
          >
            Configure Frequency
          </button>

          <button
            className="px-6 py-3 rounded-(--radius) bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] font-semibold text-sm hover:bg-[hsl(var(--muted))] transition-colors"
            onClick={onBack}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitTargetInput;