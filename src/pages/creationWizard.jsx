import { useState, useEffect, useRef } from "react";



import NewHabit from "../components/newHabit";
import HabitBasics from "../components/habitbasics";
import HabitTypeSelection from "../components/habitTypeSelection";
import HabitTargetInput from "../components/HabitTargetInput";
import HabitFrequencyConfigurator from "../components/configuration";
import MotivationSetup from "../components/motibvation";
import Dashboard from "../components/dashboard";

const initialHabit = {
    name: "",
    icon: "",
    color: "",
    type: "", // "time" | "quantity" | "value"
    target: {
        value: "",
        unit: "", // "minutes", "hours", "pages", "glasses", etc.
    },
    frequency: "",
    frequency_custom: "", // For custom intervals
    motivation: {
        whyImportant: "",
        motivationalQuote: "",
        obstacles: [],
        emergencyPlan: "",
    },
    createdAt: null,
};


// Overlay to show when habit is created
const HabitCreatedOverlay = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-[hsl(var(--card))] p-8 rounded-2xl text-center relative">
        <button className="absolute top-3 right-3" onClick={onClose}>
        ✕
        </button>

        <div className="text-5xl mb-4">🌱</div>
        <h2 className="text-2xl font-bold">Habit Created</h2>
        <p className="text-sm text-gray-400 mt-2">
        You've just planted a habit that can grow daily.
        </p>
    </div>
    </div>
);

export default function CreationWizard() {

  const stepRefs = useRef([]);

    const [habit, setHabit] = useState(() => {
        const saved = localStorage.getItem("draft-habit");
        return saved ? JSON.parse(saved) : initialHabit;
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    // scroll the active component to view
    useEffect(() => {
      const el = stepRefs.current[currentStep - 1];
      if(el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, [currentStep]);

    // Save habit to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem("draft-habit", JSON.stringify(habit));
    }, [habit]);

    // Function to complete the current step
    const completeStep = (step) => {
      if (step === currentStep) setCurrentStep(step + 1);
    };

    // Function to finalize the habit creation
const ALL_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const finalizeHabit = () => {
  const habits = JSON.parse(localStorage.getItem("habits")) || [];

  // Normalize frequency to day indices (0-6) for consistent filtering
  let normalizedFrequency = [0, 1, 2, 3, 4, 5, 6]; // Default: daily
  
  if (habit.frequency === "daily") {
    normalizedFrequency = [0, 1, 2, 3, 4, 5, 6];
  } else if (habit.frequency === "weekly" && Array.isArray(habit.frequency_custom)) {
    // User selected specific days
    normalizedFrequency = habit.frequency_custom;
  } else if (habit.frequency === "custom" && typeof habit.frequency_custom === "string") {
    // User entered custom text - default to daily but store the custom text for reference
    normalizedFrequency = [0, 1, 2, 3, 4, 5, 6];
  }

  const completed = {
    ...habit,
    id: crypto.randomUUID(),
    frequency: normalizedFrequency,
    frequency_label: habit.frequency_custom || "daily", // Store user's custom description
    createdAt: Date.now(),
    completed: false,
  };

  localStorage.setItem("habits", JSON.stringify([...habits, completed]));
  localStorage.removeItem("draft-habit");

  setShowSuccess(true);
  setTimeout(() => setShowSuccess(false), 2000);

  setHabit(initialHabit);
  setCurrentStep(1);
};




    return (
      <>
        <h1 className="creation-wizard-h1">creation Wizard</h1>
        <p className="creation-wizard-p">Step by habit construction</p>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          <section ref={(el) => (stepRefs.current[0] = el)}>
            <NewHabit
              active={currentStep === 1}
              onNext={() => completeStep(1)}
            />
          </section>

          <section ref={(el) => (stepRefs.current[1] = el)}>
            <HabitBasics
              active={currentStep === 2}
              habit={habit}
              setHabit={setHabit}
              onNext={() => completeStep(2)}
              onBack={() => setCurrentStep(1)}
            />
          </section>

          <section ref={(el) => (stepRefs.current[2] = el)}>
            <HabitTypeSelection
              active={currentStep === 3}
              habit={habit}
              setHabit={setHabit}
              onNext={() => completeStep(3)}
              onBack={() => setCurrentStep(2)}
            />
          </section>

          <section ref={(el) => (stepRefs.current[3] = el)}>
            <HabitTargetInput
              active={currentStep === 4}
              habit={habit}
              setHabit={setHabit}
              onNext={() => completeStep(4)}
              onBack={() => setCurrentStep(3)}
            />
          </section>

          <section ref={(el) => (stepRefs.current[4] = el)}>
            <HabitFrequencyConfigurator
              active={currentStep === 5}
              habit={habit}
              setHabit={setHabit}
              onNext={() => completeStep(5)}
              onBack={() => setCurrentStep(4)}
            />
          </section>

          <section ref={(el) => (stepRefs.current[5] = el)}>
            <MotivationSetup
              active={currentStep === 6}
              habit={habit}
              setHabit={setHabit}
              onFinish={finalizeHabit}
              onBack={() => setCurrentStep(5)}
            />
          </section>
        </main>

        {showSuccess && (
          <HabitCreatedOverlay onClose={() => setShowSuccess(false)} />
        )}
      </>
    );
}