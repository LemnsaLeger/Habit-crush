import React, { useState } from 'react';
import { Target } from 'lucide-react';

const HabitTargetInput = () => {
  const [targetValue, setTargetValue] = useState(30);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 h-100 w-full">
      {/* Container */}
      <div className="relative w-400 h-auto p-8 rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        {/* Step Indicator */}
        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] flex items-center justify-center text-xs font-bold text-[hsl(var(--muted-foreground))]">
          4
        </div>

        {/* Header */}
        <header className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Habit Target Input
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-xl leading-relaxed opacity-80">
            Set your daily or session target. This adapts based on the habit
            type you selected in the previous step.
          </p>
        </header>

        {/* Input Card */}
        <div
          className="flex items-center gap-5 p-5 mb-6 rounded-(--radius) border border-[hsl(var(--border))]"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="p-3 rounded-xl bg-[hsl(var(--primary)/0.15)]">
            <Target className="text-[hsl(var(--accent))]" size={24} />
          </div>

          <div className="flex flex-col">
            <label className="text-xl font-semibold mb-1">Target Value</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                className="w-20 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
              />
              <span className="text-[hsl(var(--muted-foreground))] text-sm">
                minutes
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Alert */}
        <div className="p-4 mb-8 rounded-(--radius) bg-[hsl(var(--primary)/0.05)] border border-[hsl(var(--primary)/0.1)] text-xl">
          <p>
            <span className="text-[hsl(var(--accent))] font-semibold">
              Dynamic Adjustment:
            </span>{" "}
            Input field adapts based on habit type selected.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-row-reverse gap-3">
          <button
            className="flex-1 py-3 px-4 rounded-(--radius) font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "0 0 15px hsla(var(--primary-glow) / 0.25)",
            }}
          >
            Next: Configure Frequency
          </button>

          <button className="px-6 py-3 rounded-(--radius) bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] font-semibold text-sm hover:bg-[hsl(var(--muted))] transition-colors">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitTargetInput;