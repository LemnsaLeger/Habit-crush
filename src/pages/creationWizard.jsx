import { useState, useEffect } from "react";



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
    type: "",
    target: "",
    frequency: "",
    motivation: {
        promotem: false,
        emergency: false,
        successMessage: "",
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
        You’ve just planted a habit that can grow daily.
        </p>
    </div>
    </div>
);

export default function CreationWizard() {

    const [habit, setHabit] = useState(() => {
        const saved = localStorage.getItem("draft-habit");
        return saved ? JSON.parse(saved) : initialHabit;
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    // Save habit to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem("draft-habit", JSON.stringify(habit));
    }, [habit]);

    // Function to complete the current step
    const completeStep = (step) => {
      if (step === currentStep) setCurrentStep(step + 1);
    };

    // Function to finalize the habit creation
    const finalizeHabit = () => {
      const habits = JSON.parse(localStorage.getItem("habits")) || [];
      const completed = { ...habit, createdAt: Date.now() };

      localStorage.setItem("habits", JSON.stringify([...habits, completed]));
      localStorage.removeItem("draft-habit");

      // Show success message
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
          <NewHabit active={currentStep === 1} onNext={() => completeStep(1)} />

          <HabitBasics
            active={currentStep === 2}
            habit={habit}
            setHabit={setHabit}
            onNext={() => completeStep(2)}
            onBack={() => setCurrentStep(1)}
          />

          <HabitTypeSelection
            active={currentStep === 3}
            habit={habit}
            setHabit={setHabit}
            onNext={() => completeStep(3)}
            onBack={() => setCurrentStep(2)}
          />

          <HabitTargetInput
            active={currentStep === 4}
            habit={habit}
            setHabit={setHabit}
            onNext={() => completeStep(4)}
            onBack={() => setCurrentStep(3)}
          />

          <HabitFrequencyConfigurator
            active={currentStep === 5}
            habit={habit}
            setHabit={setHabit}
            onNext={() => completeStep(5)}
            onBack={() => setCurrentStep(4)}
          />

          <MotivationSetup
            active={currentStep === 6}
            habit={habit}
            setHabit={setHabit}
            onFinish={finalizeHabit}
            onBack={() => setCurrentStep(5)}
          />
        </main>

        {showSuccess && (
          <HabitCreatedOverlay onClose={() => setShowSuccess(false)} />
        )}
      </>
    );
}