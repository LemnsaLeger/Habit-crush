import { useState, useEffect } from "react";
import "../index.css";
import { Brain, Shield, Sparkles, Bell, Circle, CheckCircle2, X } from "lucide-react";

const MotivationSetup = ({ habit, active, setHabit, onFinish, onBack }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [whyImportant, setWhyImportant] = useState(habit.motivation?.whyImportant || "");
  const [motivationalQuote, setMotivationalQuote] = useState(habit.motivation?.motivationalQuote || "");
  const [obstacles, setObstacles] = useState(habit.motivation?.obstacles || []);
  const [emergencyPlan, setEmergencyPlan] = useState(habit.motivation?.emergencyPlan || "");
  const [newObstacle, setNewObstacle] = useState("");

  // Sync motivation data with parent
  useEffect(() => {
    setHabit({
      ...habit,
      motivation: {
        whyImportant,
        motivationalQuote,
        obstacles,
        emergencyPlan,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whyImportant, motivationalQuote, obstacles, emergencyPlan]);

  // Add obstacle to list
  const addObstacle = () => {
    if (newObstacle.trim()) {
      setObstacles([...obstacles, newObstacle.trim()]);
      setNewObstacle("");
    }
  };

  // Remove obstacle from list
  const removeObstacle = (index) => {
    setObstacles(obstacles.filter((_, i) => i !== index));
  };

  // Check if motivation is adequately filled
  const isValid = whyImportant.trim() && motivationalQuote.trim();

  const sections = [
    { 
      id: "why", 
      label: "Why is this important?", 
      icon: Brain,
      description: "Describe why this habit matters to you personally" 
    },
    { 
      id: "obstacles", 
      label: "Potential obstacles", 
      icon: Shield,
      description: "Identify barriers that might prevent you from completing this habit" 
    },
    { 
      id: "emergency", 
      label: "Emergency action plan", 
      icon: Sparkles,
      description: "What will you do if you miss a day? How will you get back on track?" 
    },
    { 
      id: "quote", 
      label: "Motivational message", 
      icon: Bell,
      description: "A personal message to inspire you to complete this habit" 
    },
  ];

  return (
    <div className="flex items-center justify-center p-6 min-h-screen w-full">
      <div className="motivation-container relative w-full max-w-2xl p-8 md:p-10">
        {/* Step Badge */}
        <div
          className={`${
            active ? "bg-[hsl(var(--accent))]" : "text-[hsl(var(--foreground))]"
          } motivation-badge absolute -top-3 -left-3 w-10 h-10 rounded-2xl flex items-center justify-center text-xl font-bold`}
        >
          6
        </div>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Habit Motivation Setup</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            Build psychological reinforcement to stay motivated. Fill in at least "Why is this important?" and "Motivational message" to continue.
          </p>
        </header>

        {/* Motivation Sections */}
        <div className="space-y-4 mb-8">
          {/* Why Important Section */}
          <div className="p-4 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))]">
            <div 
              className="flex items-start justify-between gap-4 cursor-pointer"
              onClick={() => setExpandedSection(expandedSection === "why" ? null : "why")}
            >
              <div className="flex items-start gap-3 flex-1">
                <Brain size={20} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">{sections[0].label}</h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{sections[0].description}</p>
                </div>
              </div>
              {whyImportant && <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />}
            </div>
            {expandedSection === "why" && (
              <textarea
                value={whyImportant}
                onChange={(e) => setWhyImportant(e.target.value)}
                placeholder="e.g., I want to build strength for better health and confidence..."
                className="w-full mt-3 p-3 rounded-md bg-[hsl(var(--input))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]"
                rows={3}
              />
            )}
          </div>

          {/* Obstacles Section */}
          <div className="p-4 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))]">
            <div 
              className="flex items-start justify-between gap-4 cursor-pointer"
              onClick={() => setExpandedSection(expandedSection === "obstacles" ? null : "obstacles")}
            >
              <div className="flex items-start gap-3 flex-1">
                <Shield size={20} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">{sections[1].label}</h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{sections[1].description}</p>
                </div>
              </div>
              {obstacles.length > 0 && <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />}
            </div>
            {expandedSection === "obstacles" && (
              <div className="mt-3">
                <div className="space-y-2 mb-3">
                  {obstacles.map((obstacle, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 p-2 rounded bg-[hsl(var(--input))] border border-[hsl(var(--border))]">
                      <span className="text-sm text-[hsl(var(--foreground))]">{obstacle}</span>
                      <button
                        onClick={() => removeObstacle(index)}
                        className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newObstacle}
                    onChange={(e) => setNewObstacle(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addObstacle()}
                    placeholder="e.g., Feeling tired after work..."
                    className="flex-1 p-2 rounded-md bg-[hsl(var(--input))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]"
                  />
                  <button
                    onClick={addObstacle}
                    className="px-3 py-2 rounded-md bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] text-sm font-semibold hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Emergency Plan Section */}
          <div className="p-4 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))]">
            <div 
              className="flex items-start justify-between gap-4 cursor-pointer"
              onClick={() => setExpandedSection(expandedSection === "emergency" ? null : "emergency")}
            >
              <div className="flex items-start gap-3 flex-1">
                <Sparkles size={20} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">{sections[2].label}</h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{sections[2].description}</p>
                </div>
              </div>
              {emergencyPlan && <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />}
            </div>
            {expandedSection === "emergency" && (
              <textarea
                value={emergencyPlan}
                onChange={(e) => setEmergencyPlan(e.target.value)}
                placeholder="e.g., If I miss, I'll do a 10-minute session the next morning..."
                className="w-full mt-3 p-3 rounded-md bg-[hsl(var(--input))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]"
                rows={3}
              />
            )}
          </div>

          {/* Motivational Quote Section */}
          <div className="p-4 rounded-lg bg-[hsl(var(--secondary))] border border-[hsl(var(--border))]">
            <div 
              className="flex items-start justify-between gap-4 cursor-pointer"
              onClick={() => setExpandedSection(expandedSection === "quote" ? null : "quote")}
            >
              <div className="flex items-start gap-3 flex-1">
                <Bell size={20} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">{sections[3].label}</h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{sections[3].description}</p>
                </div>
              </div>
              {motivationalQuote && <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />}
            </div>
            {expandedSection === "quote" && (
              <textarea
                value={motivationalQuote}
                onChange={(e) => setMotivationalQuote(e.target.value)}
                placeholder="e.g., You're building a stronger version of yourself..."
                className="w-full mt-3 p-3 rounded-md bg-[hsl(var(--input))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]"
                rows={3}
              />
            )}
          </div>
        </div>

        {/* Validation Message */}
        {!isValid && (
          <div className="p-3 rounded-lg bg-[hsl(var(--destructive)/0.1)] border border-[hsl(var(--destructive)/0.3)] mb-6">
            <p className="text-sm text-[hsl(var(--destructive))] font-semibold">
              ⚠️ Please fill in "Why is this important?" and "Motivational message" before creating the habit
            </p>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex flex-row-reverse items-center gap-4">
          <button
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
              !isValid 
                ? "opacity-50 cursor-not-allowed bg-[hsl(var(--muted))]" 
                : "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:opacity-90"
            }`}
            onClick={onFinish}
            disabled={!isValid}
          >
            Create Habit
          </button>
          <button
            className="px-6 py-3 rounded-xl font-bold text-sm transition-colors bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
            onClick={onBack}
          >
            Configure Frequency
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotivationSetup;