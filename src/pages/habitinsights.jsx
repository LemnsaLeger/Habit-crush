import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


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
  BookOpen,
  Brain,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
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

// Calculate completion rate by day of week
const calculateCompletionByDay = () => {
  const dayStats = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  const dayCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  
  heatmapData.forEach((d) => {
    const date = new Date(d.date);
    const dayOfWeek = date.getDay();
    dayCounts[dayOfWeek]++;
    if (d.completed) dayStats[dayOfWeek]++;
  });

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return dayNames.map((name, idx) => ({
    day: name.slice(0, 3),
    fullDay: name,
    completions: dayStats[idx] || 0,
    total: dayCounts[idx] || 1,
    rate: dayCounts[idx] > 0 ? Math.round((dayStats[idx] / dayCounts[idx]) * 100) : 0,
  }));
};

// Calculate trend (is performance improving?)
const calculateTrend = () => {
  const mid = Math.floor(heatmapData.length / 2);
  const firstHalf = heatmapData.slice(0, mid).filter(d => d.completed).length;
  const secondHalf = heatmapData.slice(mid).filter(d => d.completed).length;
  
  const firstRate = firstHalf / mid;
  const secondRate = secondHalf / (heatmapData.length - mid);
  
  if (secondRate > firstRate) return "improving";
  if (secondRate < firstRate) return "declining";
  return "stable";
};

// Generate actionable insights
const generateInsights = () => {
  const insights = [];
  const dayStats = calculateCompletionByDay();
  const bestDay = dayStats.reduce((a, b) => a.rate > b.rate ? a : b);
  const worstDay = dayStats.reduce((a, b) => a.rate < b.rate ? a : b);
  const currentStreak = calculateCurrentStreak();
  const trend = calculateTrend();

  // Best performing day
  insights.push({
    type: "positive",
    icon: CheckCircle2,
    text: `You're ${bestDay.rate}% more likely to complete on ${bestDay.fullDay}s`
  });

  // Weakness identification
  if (worstDay.rate < 50 && worstDay.total > 0) {
    insights.push({
      type: "warning",
      icon: AlertCircle,
      text: `${worstDay.fullDay}s are challenging (${worstDay.rate}% completion). Plan ahead!`
    });
  }

  // Streak momentum
  if (currentStreak > 7) {
    insights.push({
      type: "positive",
      icon: Flame,
      text: `You're on fire! ${currentStreak}-day streak - keep the momentum!`
    });
  } else if (currentStreak === 0) {
    insights.push({
      type: "warning",
      icon: AlertCircle,
      text: "Let's restart the streak. You've got this!"
    });
  }

  // Trend analysis
  if (trend === "improving") {
    insights.push({
      type: "positive",
      icon: TrendingUp,
      text: "Your consistency is improving over time!"
    });
  } else if (trend === "declining") {
    insights.push({
      type: "warning",
      icon: AlertCircle,
      text: "Performance has declined recently. Revisit your motivation."
    });
  }

  return insights;
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

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <>
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
            <p className="heatmap-subtitle">Last {days} days of activity</p>

            <div className="heatmap-grid">
              {heatmapData.map((day, idx) => (
                <div
                  key={idx}
                  className={`heatmap-cell ${
                    day.completed ? "completed" : "missed"
                  }`}
                  title={`${day.date}: ${
                    day.completed ? "Completed" : "Missed"
                  }`}
                  role="gridcell"
                  aria-label={`${day.date}: ${
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

          {/* Insights Cards */}
          <section className="insights-cards-section">
            <h2 className="section-title">Key Insights</h2>
            <div className="insights-list">
              {generateInsights().map((insight, idx) => {
                const InsightIcon = insight.icon;
                return (
                  <article key={idx} className={`insight-card insight-${insight.type}`}>
                    <div className="insight-icon">
                      <InsightIcon size={20} aria-hidden="true" />
                    </div>
                    <p className="insight-text">{insight.text}</p>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* CHARTS TAB */}
      {activeTab === "charts" && (
        <section className="charts-section">
          <h2 className="section-title">Completion by Day of Week</h2>
          <div className="day-chart">
            {calculateCompletionByDay().map((dayData) => (
              <div key={dayData.day} className="day-chart-item">
                <div className="day-bar-container">
                  <div 
                    className="day-bar" 
                    style={{ height: `${dayData.rate}%` }}
                    title={`${dayData.fullDay}: ${dayData.rate}%`}
                  ></div>
                </div>
                <div className="day-label">
                  <span className="day-name">{dayData.day}</span>
                  <span className="day-rate">{dayData.rate}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STATISTICS TAB */}
      {activeTab === "statistics" && (
        <section className="statistics-section">
          <h2 className="section-title">Detailed Statistics</h2>
          <div className="stats-detailed-grid">
            <div className="detailed-stat">
              <label>Current Streak</label>
              <div className="detailed-value">{calculateCurrentStreak()} days</div>
            </div>
            <div className="detailed-stat">
              <label>Longest Streak</label>
              <div className="detailed-value">{calculateLongestStreak()} days</div>
            </div>
            <div className="detailed-stat">
              <label>Success Rate</label>
              <div className="detailed-value">{successRate}%</div>
            </div>
            <div className="detailed-stat">
              <label>Total Completions</label>
              <div className="detailed-value">{heatmapData.filter((d) => d.completed).length}</div>
            </div>
            <div className="detailed-stat">
              <label>Total Attempts</label>
              <div className="detailed-value">{heatmapData.length}</div>
            </div>
            <div className="detailed-stat">
              <label>Trend</label>
              <div className="detailed-value">{calculateTrend().toUpperCase()}</div>
            </div>
          </div>

          <div className="best-worst-days">
            <div className="best-day-card">
              <h3><TrendingUp /> Best Performing Day</h3>
              <p className="day-name-large">{calculateCompletionByDay().reduce((a, b) => a.rate > b.rate ? a : b).fullDay}</p>
              <p className="day-rate-large">{calculateCompletionByDay().reduce((a, b) => a.rate > b.rate ? a : b).rate}% completion</p>
            </div>
            <div className="worst-day-card">
              <h3><TrendingDown /> Most Challenging Day</h3>
              <p className="day-name-large">{calculateCompletionByDay().reduce((a, b) => a.rate < b.rate ? a : b).fullDay}</p>
              <p className="day-rate-large">{calculateCompletionByDay().reduce((a, b) => a.rate < b.rate ? a : b).rate}% completion</p>
            </div>
          </div>
        </section>
      )}

      {/* HISTORY TAB */}
      {activeTab === "history" && (
        <section className="history-section">
          <h2 className="section-title">Activity History</h2>
          <div className="history-list">
            {heatmapData.slice().reverse().map((day, idx) => (
              <div key={idx} className={`history-item ${day.completed ? "completed" : "missed"}`}>
                <div className="history-date bg-amber-300">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                <div className="history-status">
                  {day.completed ? (
                    <span className="badge-completed">✓ Completed</span>
                  ) : (
                    <span className="badge-missed">✗ Missed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Action Buttons */}
      <footer className="insights-actions">
        <Link to={`/insights/${habitId}`} className="action-button-insights secondary">
          <Clock size={18} aria-hidden="true" />
          <span>View History</span>
        </Link>
        <Link to="/settings" className="action-button-insights secondary">
          <SettingsIcon size={18} aria-hidden="true" />
          <span>Settings</span>
        </Link>
        <Link to="/settings" className="action-button-insights primary">
          <Edit size={18} aria-hidden="true" />
          <span>Edit Habit</span>
        </Link>
      </footer>
    </div>
  );
}
