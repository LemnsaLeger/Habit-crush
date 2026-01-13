import{ useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Coffee,
  Zap,
  Play,
  Minus,
  Plus,
  Check,
  TrendingUp,
  Target,
  BookOpen,
  Clock,
  Dumbbell,
} from "lucide-react";
import "./styles/today.css";

export default function Today() {
  // Get current day
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

  // State to hold habits
  const [habits, setHabits] = useState([]);


// heloer for days of the week
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getTodayName = () => DAYS[new Date().getDay()];

const getTodayKey = () =>
  `today-habits-${new Date().toISOString().split("T")[0]}`;


// Build today's habits
const buildTodayHabits = () => {
  const master = JSON.parse(localStorage.getItem("habits")) || [];
  const today = getTodayName();
  const todayKey = getTodayKey();

  const progress = JSON.parse(localStorage.getItem(todayKey)) || [];

  return master
    .filter((h) => h.frequency?.includes(today))
    .map((habit) => {
      const saved = progress.find((p) => p.habitId === habit.id);

      return {
        ...habit,
        currentValue: saved?.currentValue ?? 0,
      };
    });
};

useEffect(() => {
  setHabits(buildTodayHabits());
}, []);

// Save progress to localStorage
useEffect(() => {
  const todayKey = getTodayKey();

  const progressOnly = habits.map((h) => ({
    habitId: h.id,
    currentValue: h.currentValue,
  }));

  localStorage.setItem(todayKey, JSON.stringify(progressOnly));
}, [habits]);



  // Get habit progress
  const getHabitProgress = (habit) => {
    if (habit.type === "binary") return habit.completed ? 100 : 0;
    return Math.min(
      Math.round((habit.currentValue / habit.targetValue) * 100),
      100
    );
  };

  // Check if habit is completed
const isHabitCompleted = (habit) => {
  if (habit.type === "binary") return habit.currentValue === 1;
  return habit.currentValue >= habit.targetValue;
};


const totalHabits = habits.length;
const completedCount = habits.filter(isHabitCompleted).length;
const progressPercentage =
  totalHabits === 0 ? 0 : Math.round((completedCount / totalHabits) * 100);


const handleIncrement = (id) => {
  setHabits((prev) =>
    prev.map((h) => {
      if (h.id !== id) return h;

      const newValue = h.currentValue + 1;
      return {
        ...h,
        currentValue: newValue,
        completed: newValue >= h.targetValue,
      };
    })
  );
};

    const handleToggleBinary = (id) => {
      setHabits((prev) =>
        prev.map((h) =>
          h.id === id ? { ...h, currentValue: h.currentValue ? 0 : 1 } : h
        )
      );
    };



  const handleDecrement = (id) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id || h.currentValue <= 0) return h;

        const newValue = h.currentValue - 1;
        return {
          ...h,
          currentValue: newValue,
          completed: newValue >= h.targetValue,
        };
      })
    );
  };

  // Start time-based habit
  const handleStartTimeHabit = (id) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        const newValue = h.currentValue + 1;
        return {
          ...h,
          currentValue: newValue,
          completed: newValue >= h.targetValue,
        };
      })
    );
  };


  return (
    <div className="today-container">
      {/* Header Section */}
      <header className="today-header">
        <div className="greeting-icon-wrapper">
          <Coffee size={32} aria-hidden="true" />
        </div>
        <div>
          <h1 className="greeting-title">Good morning!</h1>
          <p className="greeting-subtitle">Start your day with intention</p>
        </div>
      </header>

      {/* Day Info */}
      <section className="day-info">
        <p className="day-text">
          It's <span className="day-highlight">{currentDay}</span>. You have{" "}
          <span className="habits-highlight">{totalHabits} habits</span>{" "}
          scheduled for today.
        </p>
      </section>

      {/* Progress Card */}
      <article className="progress-card">
        <div className="progress-header">
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
      <section className="todays-habits-section">
        <h2 className="section-title-with-icon">
          <Target size={24} aria-hidden="true" />
          <span>Today's Habits</span>
        </h2>

        <div className="habits-list">
          {habits.map((habit) => (
            <article
              key={habit.id}
              className={`habit-tracker-card ${
                habit.completed ? "completed" : ""
              }`}
            >
              <div className="habit-tracker-header">
                <div className="habit-tracker-title-row">
                  <div className="habit-tracker-icon">
                    <span role="img" aria-label={habit.name}>
                      <habit.icon color="hsl(var(--primary))" />
                    </span>
                  </div>
                  <div>
                    <h3 className="habit-tracker-name">{habit.name}</h3>
                    <span className="habit-tracker-type">
                      {habit.type === "time" && "⏱️ time"}
                      {habit.type === "quantity" && "# quantity"}
                      {habit.type === "binary" && "⚪ binary"}
                    </span>
                  </div>
                </div>
                {habit.completed && (
                  <span className="completion-badge">
                    <Check size={14} aria-hidden="true" />
                    Done
                  </span>
                )}
              </div>

              {/* Time/Quantity Habit Controls */}
              {(habit.type === "time" || habit.type === "quantity") && (
                <div className="habit-controls">
                  <div className="timer-display">
                    {String(Math.floor(habit.currentValue / 60)).padStart(
                      2,
                      "0"
                    )}
                    :{String(habit.currentValue % 60).padStart(2, "0")}
                  </div>

                  <button
                    className="start-button"
                    onClick={() => handleStartTimeHabit(habit.id)}
                  >
                    <Play size={16} />
                    Start
                  </button>

                  <span className="target-text">
                    Target: {habit.targetValue} {habit.unit}
                  </span>
                </div>
              )}

              {/* Quantity Counter */}
              {habit.type === "quantity" && (
                <div className="quantity-controls">
                  <button
                    className="quantity-button"
                    onClick={() => handleDecrement(habit.id)}
                    aria-label="Decrease"
                  >
                    <Minus size={18} aria-hidden="true" />
                  </button>
                  <span className="quantity-value">{habit.currentValue}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleIncrement(habit.id)}
                    aria-label="Increase"
                  >
                    <Plus size={18} aria-hidden="true" />
                  </button>
                  <span className="quantity-target">
                    / {habit.targetValue} {habit.unit}
                  </span>
                </div>
              )}

              {/* Binary Habit */}
              {habit.type === "binary" && (
                <>
                  <div className="habit-progress-bar-full">
                    <div className="habit-progress-fill-full" />
                  </div>
                  <button
                    className="completion-status"
                    onClick={() => handleToggleBinary(habit.id)}
                  >
                    <Check size={16} />
                    <span>
                      {isHabitCompleted(habit) ? "Completed" : "Mark done"}
                    </span>
                  </button>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Action Buttons */}
      <footer className="today-actions">
        <Link to="/" className="action-btn secondary">
          <TrendingUp size={18} aria-hidden="true" />
          <span>View Dashboard</span>
        </Link>
        <Link className="action-btn primary" to="/create-habit">
          <Target size={18} aria-hidden="true" />
          <span>Add New Habit</span>
        </Link>
      </footer>
    </div>
  );
}
