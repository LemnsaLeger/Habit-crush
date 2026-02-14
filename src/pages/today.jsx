import React, { useState, useEffect } from "react";
import {
  Coffee,
  Zap,
  Play,
  Pause,
  Check,
  Minus,
  Plus,
  TrendingUp,
  Target,
  X,
  Medal,
  BicepsFlexed,
  BookSearchIcon,
} from "lucide-react";

import "../index.css";
import "./styles/today.css";
import { Link } from "react-router-dom";

export default function Today() {
  // Get current day and greeting
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = days[new Date().getDay()];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };

  const [greeting] = useState(getGreeting());

  // Dynamic state management for loaded habits
  const [habitStates, setHabitStates] = useState({});
  const intervalsRef = React.useRef({});

  const dayIndex = new Date().getDay(); // 0–6

  const habits = JSON.parse(localStorage.getItem("habits")) || [];

  // Load only habits scheduled for today
  const todaysHabits = habits.filter(
    (habit) =>
      !habit.frequency || habit.frequency.length === 0 || habit.frequency.includes(dayIndex),
  );

  // Calculate global progress from dynamic habits
  const completedCount = todaysHabits.filter(h => h.completed).length;
  const totalHabits = todaysHabits.length || 1; // Avoid division by zero
  const progressPercentage = totalHabits > 0 
    ? Math.round((completedCount / totalHabits) * 100) 
    : 0;
  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Helper: Get icon component from habit icon ID
  const getHabitIcon = (iconId, size = 24) => {
    const iconMap = {
      biceps: <BicepsFlexed size={size} />,
      book: <BookSearchIcon size={size} />,
      medal: <Medal size={size} />,
    };
    return iconMap[iconId] || <Medal size={size} />;
  };

  // Dynamic habit handlers
  const updateHabitState = (habitId, updates) => {
    setHabitStates(prev => ({
      ...prev,
      [habitId]: { ...prev[habitId], ...updates }
    }));
  };

  const handleStartTimer = (habitId) => {
    if (intervalsRef.current[habitId]) return;
    updateHabitState(habitId, { isTimerRunning: true });
    intervalsRef.current[habitId] = setInterval(() => {
      setHabitStates(prev => ({
        ...prev,
        [habitId]: { ...prev[habitId], timerSeconds: (prev[habitId]?.timerSeconds || 0) + 1 }
      }));
    }, 1000);
  };

  const handlePauseTimer = (habitId) => {
    clearInterval(intervalsRef.current[habitId]);
    intervalsRef.current[habitId] = null;
    updateHabitState(habitId, { isTimerRunning: false });
  };

  const handleCompleteTimer = (habitId) => {
    clearInterval(intervalsRef.current[habitId]);
    intervalsRef.current[habitId] = null;
    updateHabitState(habitId, { isTimerRunning: false, completed: true });
    
    // Save to localStorage
    const updated = habits.map(h => 
      h.id === habitId ? { ...h, completed: true } : h
    );
    localStorage.setItem("habits", JSON.stringify(updated));
  };

  // Quantity handlers
  const handleIncrementPages = (habitId) => {
    const current = habitStates[habitId] || { value: 0 };
    const newValue = (current.value || 0) + 1;
    const isComplete = Number(current.target || 20) <= newValue;
    updateHabitState(habitId, { value: newValue, completed: isComplete });
    
    if (isComplete) {
      const updated = habits.map(h => 
        h.id === habitId ? { ...h, completed: true } : h
      );
      localStorage.setItem("habits", JSON.stringify(updated));
    }
  };

  const handleDecrementPages = (habitId) => {
    const current = habitStates[habitId] || { value: 0 };
    const newValue = Math.max(0, (current.value || 0) - 1);
    updateHabitState(habitId, { value: newValue, completed: false });
  };

  // Exercise handler
  const handleCompleteExercise = (habitId) => {
    updateHabitState(habitId, { completed: true });
    const updated = habits.map(h => 
      h.id === habitId ? { ...h, completed: true } : h
    );
    localStorage.setItem("habits", JSON.stringify(updated));
  };

  // Cleanup intervals on unmount
  useEffect(() => {
    const intervals = intervalsRef.current;
    return () => {
      Object.values(intervals).forEach(i => i && clearInterval(i));
    };
  }, []);

  return (
    <div className="today-container">
      {/* Header Section */}
      <header className="flex items-center gap-5 mb-8">
        <div className="greeting-icon-wrapper">
          <Coffee size={32} aria-hidden="true" />
        </div>
        <div>
          <h1 className="greeting-title">{greeting}</h1>
          <p className="greeting-subtitle">Start your day with intention</p>
        </div>
      </header>

      {/* Day Info */}
      <section className="mb-8">
        <p className="day-text">
          It's <span className="day-highlight">{currentDay}</span>. You have{" "}
          <span className="habits-highlight">{totalHabits} habits</span>{" "}
          scheduled for today.
        </p>
      </section>

      {/* Global Progress Card */}
      <article className="progress-card">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="progress-label">Today's Progress</p>
            <h2 className="progress-title">
              {completedCount}/{totalHabits} completed
            </h2>
          </div>
          <div className="progress-percentage">{progressPercentage}%</div>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`${progressPercentage}% progress`}
          />
        </div>
      </article>

      {/* Daily Tip */}
      <article className="daily-tip-card">
        <div className="tip-icon-wrapper">
          <Zap size={20} aria-hidden="true" />
        </div>
        <div>
          <h3 className="tip-title">Daily Tip</h3>
          <p className="tip-content">
            Stack habits together - do new habits right after existing routines.
          </p>
        </div>
      </article>

      {/* Today's Habits Section */}
      <section className="mt-12">
        <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 section-title-with-icon">
          <Target size={24} aria-hidden="true" />
          <span>Today's Habits</span>
        </h2>

        <div className="flex flex-col gap-5">
          {/* Render dynamically loaded tasks using templates */}
          {todaysHabits.length === 0 ?
            <p className="text-gray-400 text-center py-8">
              No habits scheduled for today. Create one to get started!
            </p>
          : todaysHabits.map((habit) => {
              const isCompleted = habit.completed || false;
              const isTimerBased = habit.type === "time";
              const isQuantityBased = habit.type === "quantity";
              const state = habitStates[habit.id] || {
                timerSeconds: 0,
                isTimerRunning: false,
                value: 0,
                completed: isCompleted,
              };

              return (
                <article
                  key={habit.id}
                  className={`habit-tracker-card ${isCompleted ? "completed" : ""}`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className="habit-tracker-icon">
                        <span role="img" aria-label={habit.name}>
                          {getHabitIcon(habit.icon)}
                        </span>
                      </div>
                      <div>
                        <h3 className="habit-tracker-name">{habit.name}</h3>
                        <span className="habit-tracker-type">
                          {habit.type}
                          {habit.frequency_label &&
                            habit.frequency_label !== "daily" && (
                              <span className="ml-2 text-xs text-gray-400">
                                • {habit.frequency_label}
                              </span>
                            )}
                        </span>
                      </div>
                    </div>
                    {isCompleted && (
                      <span className="completion-badge">
                        <Check size={14} aria-hidden="true" />
                        Done
                      </span>
                    )}
                  </div>

                  {/* Timer-based task */}
                  {isTimerBased && (
                    <div className="flex items-center gap-4 flex-wrap mb-4">
                      <div className="timer-display">
                        {formatTime(state.timerSeconds || 0)}
                      </div>

                      {!isCompleted && !state.isTimerRunning && (
                        <button
                          className="start-button"
                          onClick={() => handleStartTimer(habit.id)}
                        >
                          <Play size={16} aria-hidden="true" />
                          <span>Start</span>
                        </button>
                      )}

                      {!isCompleted && state.isTimerRunning && (
                        <>
                          <button
                            className="pause-button"
                            onClick={() => handlePauseTimer(habit.id)}
                          >
                            <Pause size={16} aria-hidden="true" />
                            <span>Pause</span>
                          </button>
                          <button
                            className="complete-button"
                            onClick={() => handleCompleteTimer(habit.id)}
                          >
                            <Check size={16} aria-hidden="true" />
                            <span>Complete</span>
                          </button>
                        </>
                      )}

                      <span className="target-text ml-auto">
                        Target:{" "}
                        {typeof habit.target === "object" ?
                          `${habit.target?.value} ${habit.target?.unit || "minutes"}`
                        : `${habit.target || "30"} minutes`}
                      </span>
                    </div>
                  )}

                  {/* Quantity-based task */}
                  {isQuantityBased && (
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        className="quantity-button"
                        onClick={() => handleDecrementPages(habit.id)}
                        aria-label="Decrease"
                        disabled={state.value === 0}
                      >
                        <Minus size={18} aria-hidden="true" />
                      </button>
                      <span className="quantity-value">{state.value || 0}</span>
                      <button
                        className="quantity-button"
                        onClick={() => handleIncrementPages(habit.id)}
                        aria-label="Increase"
                      >
                        <Plus size={18} aria-hidden="true" />
                      </button>
                      <span className="quantity-target">
                        /{" "}
                        {typeof habit.target === "object" ?
                          `${habit.target?.value} ${habit.target?.unit}`
                        : `${habit.target || "20"} units`}
                      </span>
                    </div>
                  )}

                  {!isQuantityBased && !isTimerBased && (
                    <div>
                      {!isCompleted ?
                        <button
                          className="mark-done-button"
                          onClick={() => handleCompleteExercise(habit.id)}
                        >
                          <Check size={18} aria-hidden="true" />
                          <span>Mark Done</span>
                        </button>
                      : <>
                          <div className="habit-progress-bar-full">
                            <div className="habit-progress-fill-full" />
                          </div>
                          <div className="completion-status">
                            <Check size={16} aria-hidden="true" />
                            <span>Completed</span>
                          </div>
                        </>
                      }
                    </div>
                  )}
                </article>
              );
            })
          }
        </div>
      </section>

      {/* Action Buttons */}
      <footer className="flex gap-4 mt-8 flex-wrap">
        <Link to="/" className="action-btn secondary">
          <TrendingUp size={18} aria-hidden="true" />
          <span>View Dashboard</span>
        </Link>
        <Link to="/create-habit" className="action-btn primary">
          <Target size={18} aria-hidden="true" />
          <span>Add New Habit</span>
        </Link>
      </footer>
    </div>
  );
}
