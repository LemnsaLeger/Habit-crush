

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

  const [greeting, setGreeting] = useState(getGreeting());

  // Timer state for Morning Meditation
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [meditationCompleted, setMeditationCompleted] = useState(false);
  const [showMeditationMessage, setShowMeditationMessage] = useState(false);

  // Quantity state for Read Books
  const [pagesRead, setPagesRead] = useState(0);
  const [booksCompleted, setBooksCompleted] = useState(false);
  const [showBooksMessage, setShowBooksMessage] = useState(false);
  const pagesTarget = 20;

  // Binary state for Exercise
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [showExerciseMessage, setShowExerciseMessage] = useState(false);

  // Calculate global progress
  const totalHabits = 3;
  const completedCount = [
    meditationCompleted,
    booksCompleted,
    exerciseCompleted,
  ].filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / totalHabits) * 100);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning && !meditationCompleted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, meditationCompleted]);

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Timer handlers
  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleCompleteTimer = () => {
    setIsTimerRunning(false);
    setMeditationCompleted(true);
    setShowMeditationMessage(true);
    setTimeout(() => setShowMeditationMessage(false), 5000);
  };

  // Quantity handlers
  const handleIncrementPages = () => {
    const newValue = pagesRead + 1;
    setPagesRead(newValue);
    if (newValue >= pagesTarget) {
      setBooksCompleted(true);
      setShowBooksMessage(true);
      setTimeout(() => setShowBooksMessage(false), 5000);
    }
  };

  const handleDecrementPages = () => {
    if (pagesRead > 0) {
      const newValue = pagesRead - 1;
      setPagesRead(newValue);
      if (newValue < pagesTarget) {
        setBooksCompleted(false);
      }
    }
  };

  // Exercise handler
  const handleCompleteExercise = () => {
    setExerciseCompleted(true);
    setShowExerciseMessage(true);
    setTimeout(() => setShowExerciseMessage(false), 5000);
  };

  const handleUndoExercise = () => {
    setExerciseCompleted(false);
  };

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
          {/* Morning Meditation - Time-based */}
          <article
            className={`habit-tracker-card ${meditationCompleted ? "completed" : ""}`}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="habit-tracker-icon">
                  <span role="img" aria-label="Morning Meditation">
                    <BicepsFlexed size={24}/>
                  </span>
                </div>
                <div>
                  <h3 className="habit-tracker-name">Morning Meditation</h3>
                  <span className="habit-tracker-type">⏱️ time</span>
                </div>
              </div>
              {meditationCompleted && (
                <span className="completion-badge">
                  <Check size={14} aria-hidden="true" />
                  Done
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 flex-wrap mb-4">
              <div className="timer-display">{formatTime(timerSeconds)}</div>

              {!meditationCompleted && !isTimerRunning && (
                <button className="start-button" onClick={handleStartTimer}>
                  <Play size={16} aria-hidden="true" />
                  <span>Start</span>
                </button>
              )}

              {!meditationCompleted && isTimerRunning && (
                <>
                  <button className="pause-button" onClick={handlePauseTimer}>
                    <Pause size={16} aria-hidden="true" />
                    <span>Pause</span>
                  </button>
                  <button
                    className="complete-button"
                    onClick={handleCompleteTimer}
                  >
                    <Check size={16} aria-hidden="true" />
                    <span>Complete</span>
                  </button>
                </>
              )}

              <span className="target-text ml-auto">Target: 30 minutes</span>
            </div>

            {showMeditationMessage && (
              <div className="success-message">
                <Check size={16} aria-hidden="true" />
                <span>Great job staying mindful today!</span>
              </div>
            )}
          </article>

          {/* Read Books - Quantity-based */}
          <article
            className={`habit-tracker-card ${booksCompleted ? "completed" : ""}`}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="habit-tracker-icon">
                  <span role="img" aria-label="Read Books">
                    <BookSearchIcon size={24} />
                  </span>
                </div>
                <div>
                  <h3 className="habit-tracker-name">Read Books</h3>
                  <span className="habit-tracker-type"># quantity</span>
                </div>
              </div>
              {booksCompleted && (
                <span className="completion-badge">
                  <Check size={14} aria-hidden="true" />
                  Done
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <button
                className="quantity-button"
                onClick={handleDecrementPages}
                aria-label="Decrease pages"
                disabled={pagesRead === 0}
              >
                <Minus size={18} aria-hidden="true" />
              </button>
              <span className="quantity-value">{pagesRead}</span>
              <button
                className="quantity-button"
                onClick={handleIncrementPages}
                aria-label="Increase pages"
              >
                <Plus size={18} aria-hidden="true" />
              </button>
              <span className="quantity-target">/ {pagesTarget} pages</span>
            </div>

            {!booksCompleted && pagesRead > 0 && (
              <div className="reminder-message">
                <span>Keep going! {pagesTarget - pagesRead} pages to go.</span>
              </div>
            )}

            {showBooksMessage && (
              <div className="success-message">
                <Check size={16} aria-hidden="true" />
                <span>Amazing! You've reached your reading goal!</span>
              </div>
            )}
          </article>

          {/* Exercise - Binary */}
          <article
            className={`habit-tracker-card ${exerciseCompleted ? "completed" : ""}`}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="habit-tracker-icon">
                  <span role="img" aria-label="Exercise">
                    <Medal size={24} />
                  </span>
                </div>
                <div>
                  <h3 className="habit-tracker-name">Exercise</h3>
                  <span className="habit-tracker-type"> binary</span>
                </div>
              </div>
              {exerciseCompleted && (
                <button
                  className="undo-button"
                  onClick={handleUndoExercise}
                  aria-label="Undo completion"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>

            {!exerciseCompleted ?
              <button
                className="mark-done-button"
                onClick={handleCompleteExercise}
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

            {showExerciseMessage && (
              <div className="success-message">
                <Check size={16} aria-hidden="true" />
                <span>You showed up for yourself today!</span>
              </div>
            )}
          </article>
        </div>
      </section>

      {/* Action Buttons */}
      <footer className="flex gap-4 mt-8 flex-wrap">
        <button className="action-btn secondary">
          <TrendingUp size={18} aria-hidden="true" />
          <span>View Dashboard</span>
        </button>
        <button className="action-btn primary">
          <Target size={18} aria-hidden="true" />
          <span>Add New Habit</span>
        </button>
      </footer>
    </div>
  );
}
