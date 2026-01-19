import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


import {
  ArrowLeft,
  Lightbulb,
  Flame,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Settings as SettingsIcon,
  Edit,
  Dumbbell,
  BookOpen
} from "lucide-react";
import "./styles/habitinsight.css";

export default function HabitInsights() {
  const { habitId } = useParams();
  const random = Math.random();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [activePeriod, setActivePeriod] = useState("30");

  const [habit, setHabit] = useState(null);


  useEffect(() => {
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    const found = habits.find(
      (h) => String(h.createdAt) === habitId || String(h.id) === habitId,
    );
    setHabit(found || null);
  }, [habitId]);

    if (!habit) {
      return <p className="p-8">Habit not found</p>;
    }


const days = Number(activePeriod);

const activityMap = new Map(
  (habit.activity || []).map((a) => [a.date, a.completed]),
);

// Generate heatmap data for the last X days
const heatmapData = Array.from({ length: days }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (days - i - 1));

  const key = date.toISOString().split("T")[0];

  return {
    date: key,
    completed: activityMap.get(key) || false,
  };
});

// Calculate current streak
const calculateCurrentStreak = () => {
  let streak = 0;
  for (let i = heatmapData.length - 1; i >= 0; i--) {
    if (heatmapData[i].completed) streak++;
    else break;
  }
  return streak;
};

// Calculate longest streak
const calculateLongestStreak = () => {
  let max = 0,
    current = 0;
  heatmapData.forEach((d) => {
    if (d.completed) {
      current++;
      max = Math.max(max, current);
    } else {
      current = 0;
    }
  });
  return max;
};

// const successRate = Math.round(
const successRate = Math.round(
  (heatmapData.filter((d) => d.completed).length / heatmapData.length) * 100,
);



  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "charts", label: "Charts" },
    { id: "statistics", label: "Statistics" },
    { id: "history", label: "History" },
  ];

  const periods = [
    { id: "30", label: "30 Days" },
    { id: "90", label: "90 Days" },
    { id: "365", label: "1 Year" },
  ];

  const stats = [
    {
      id: 1,
      icon: Flame,
      value: calculateCurrentStreak(),
      label: "Current Streak",
    },
    {
      id: 2,
      icon: Target,
      value: calculateLongestStreak(),
      label: "Longest Streak",
    },
    {
      id: 3,
      icon: TrendingUp,
      value: `${successRate}%`,
      label: "Success Rate",
    },
    {
      id: 4,
      icon: Calendar,
      value: heatmapData.filter((d) => d.completed).length,
      label: "Total Completions",
    },
  ];


  return (
    <div className="habit-insights-container">
      {/* Header */}
      <header className="insights-header">
        <button
          onClick={() => navigate(-1)}
          className="back-button-insights"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-4">
          <div className="habit-icon-insights">
            <span role="img" aria-label={habit.name}>
              {
                habit.icon === "exercise" ? <Dumbbell /> : habit.icon === "mind" ? <Brain  /> : habit.icon === "read" ? <BookOpen /> : habit.icon === "time" ? <Clock  /> : <></>
              }
            </span>
          </div>
          <div>
            <h1 className="insights-title">{habit.name}</h1>
            <p className="insights-subtitle">{habit.type} habit</p>

            <p className="insights-subtitle">Insights & Analytics</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="tabs-container" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Period Filter */}
      <div className="period-filter">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => setActivePeriod(period.id)}
            className={`period-button ${
              activePeriod === period.id ? "active" : ""
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <section className="stats-grid-insights">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.id} className="stat-card-insights">
              <div className={`stat-icon-wrapper-insights ${stat.iconBg}`}>
                <Icon size={24} className={stat.iconColor} aria-hidden="true" />
              </div>
              <div>
                <div className="stat-value-insights">{stat.value}</div>
                <div className="stat-label-insights">{stat.label}</div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Activity Heatmap */}
      <section className="heatmap-section">
        <h2 className="heatmap-title">Activity Heatmap</h2>
        <p className="heatmap-subtitle">Last 90 days of activity</p>

        <div className="heatmap-grid">
          {heatmapData.map((day) => (
            <div
              key={day.day}
              className={`heatmap-cell ${
                day.completed ? "completed" : "missed"
              }`}
              title={`Day ${day.day + 1}: ${
                day.completed ? "Completed" : "Missed"
              }`}
              role="gridcell"
              aria-label={`Day ${day.day + 1}: ${
                day.completed ? "Completed" : "Missed"
              }`}
            />
          ))}
        </div>

        <div className="heatmap-legend">
          <div className="legend-item">
            <div className="legend-dot missed"></div>
            <span className="text-sm text-muted">Missed</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot completed"></div>
            <span className="text-sm text-primary-custom">Completed</span>
          </div>
        </div>
      </section>

      {/* Insights Card */}
      <article className="insights-card">
        <div className="insights-card-header">
          <Lightbulb size={24} className="text-warning" aria-hidden="true" />
          <h3 className="insights-card-title">Insights</h3>
        </div>
        <div className="insights-card-content">
          <p className="insight-text">
            <strong className="text-primary-custom">Best day:</strong> You're
            100% more likely to complete this habit on Mons
          </p>
        </div>
      </article>

      {/* Action Buttons */}
      <footer className="insights-actions">
        <button className="action-button-insights secondary">
          <Clock size={18} aria-hidden="true" />
          <span>View History</span>
        </button>
        <button className="action-button-insights secondary">
          <SettingsIcon size={18} aria-hidden="true" />
          <span>Settings</span>
        </button>
        <button className="action-button-insights primary">
          <Edit size={18} aria-hidden="true" />
          <span>Edit Habit</span>
        </button>
      </footer>
    </div>
  );
}
