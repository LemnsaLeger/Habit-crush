import { Link } from "react-router-dom";
import {useState, useEffect} from "react"; 

import { CheckCircle2, Flame,  TrendingUp, Target, Plus, Info, Clock, Dumbbell, Brain, BookOpen } from "lucide-react";

import "../index.css";
import "./styles/dashboard.css";

export default function DashboardPrime () {

  

    const [habits, setHabits] = useState([]);
    
    const stats = [
      {
        id: 1,
        icon: CheckCircle2,
        value: "0/3",
        label: "Today's Progress",
        iconBg: "stat-icon-teal",
      },
      {
        id: 2,
        icon: Flame,
        value: "1",
        label: "Best Streak",
        iconBg: "stat-icon-blue",
      },
      {
        id: 3,
        icon: TrendingUp,
        value: "68%",
        label: "Avg Completion",
        iconBg: "stat-icon-green",
      },
      {
        id: 4,
        icon: Target,
        value: habits.length.toString(),
        label: "Active Habits",
        iconBg: "stat-icon-gold",
      },
    ];

// Load habits from localStorage
useEffect(() => {
  const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];

  const normalized = storedHabits.map((habit, index) => ({
    id: habit.createdAt || index,
    name: habit.name,
    type: habit.type,
    streak: 0,
    rate: 0,
    icon: habit.icon,
    iconBg: `habit-icon-${habit.color || "teal"}`,
  }));

  setHabits(normalized);
}, []);


    return (
      <div className="dashboard-container min-h-screen p-8 mt-8">
        {/* stats grid */}
        <section className="stats-grid grid gap-6 mt-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article
                key={stat.id}
                className="stat-card p-6 flex items-center gap-5"
              >
                <div
                  className={`stat-icon-wrapper ${stat.iconBg} w-14 h-14 flex items-center justify-center shrink-0`}
                >
                  <Icon size={24} aria-hidden="true" />
                </div>
                <div className="stat-content flex-1">
                  <div className="stat-value text-[2rem] font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="stat-label text-[0.875rem]">{stat.label}</div>
                </div>
              </article>
            );
          })}
        </section>

        {/* habits section */}
        <section className="habits-section">
          <header className="habits-header">
            <h2 className="habits-title">Your Habits</h2>
            <Link to="/create-habit" className="add-habit-button">
              <Plus size={18} aria-hidden="true" />
              <span>Add Habit</span>
            </Link>
          </header>

          <div className="habits-grid">
            {/* if no habit is createed yet */}
            {habits.length === 0 && (
              <div className="empty-habits text-center p-12 opacity-60">
                <p className="text-lg mb-2">No habits yet</p>
                <p className="text-sm">
                  Create your first habit to get started.
                </p>
              </div>
            )}

            {habits.map((habit) => {
              return (
                <article key={habit.id} className="habit-card p-2 rounded-sm">
                  <header className="habit-header mb-5">
                    <div className="habit-title-row flex items-center gap-4">
                      <div
                        className={`habit-icon-wrapper ${habit.iconBg} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}
                      >
                        <span
                          className={`habit-emoji text-[1.5rem]`}
                          role="img"
                          aria-label={habit.name}
                        >
                          {habit.icon === "exercise" ?
                            <Dumbbell />
                          : habit.icon === "mind" ?
                            <Brain />
                          : habit.icon === "read" ?
                            <BookOpen />
                          : habit.icon === "time" ?
                            <Clock />
                          : <>;</>}
                        </span>
                      </div>
                      <div>
                        <h3 className="habit-name">{habit.name}</h3>
                        <p className="habit-type">{habit.type}</p>
                      </div>
                    </div>
                  </header>

                  <div className="habit-stats">
                    <div className="habit-streak">
                      <Flame
                        size={16}
                        className="streak-icon"
                        aria-hidden="true"
                      />
                      <span className="streak-text">
                        {habit.streak} day streak
                      </span>
                      <span className="habit-rate">{habit.rate}% rate</span>
                    </div>

                    <div className="habit-progress-bar">
                      <div
                        className="habit-progress-fill"
                        style={{ width: `${habit.rate}%` }}
                        role="progressbar"
                        aria-valuenow={habit.rate}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`${habit.rate}% completion rate`}
                      />
                    </div>
                  </div>

                  <footer className="habit-actions">
                    <Link
                      className="habit-action-button"
                      to={`/insights/${habit.id}`}
                    >
                      <Info size={16} aria-hidden="true" />
                      <span>Insights</span>
                    </Link>
                    <button className="habit-action-button secondary">
                      <Clock size={16} aria-hidden="true" />
                      <span>History</span>
                    </button>
                  </footer>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    );
};