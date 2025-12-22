import React from "react";
import {
  Plus,
  SquareCheck,
  Clock,
  Hash,
  LineChart,
  BarChart2,
  Zap,
  Keyboard,
  Clock10,
  Settings,
  Edit,
  MessageSquare,
  Bell,

} from "lucide-react";

const Dashboard = () => {
  const menuItems = [
    { label: "Add New Habit", icon: Plus },
    { label: "Log Binary Habit", icon: SquareCheck },
    { label: "Log Time/Numeric Habit", icon: Clock },
    { label: "Log Quantity Habit", icon: Hash },
    { label: "Log Value Habit", icon: LineChart },
    { label: "Habit Insights", icon: BarChart2 },
    { label: "Catch-Up Mode", icon: Zap },
    { label: "Keyboard Shortcuts", icon: Keyboard },
    { label: "View all Habits History", icon: Clock10 },
    { label: "Go to Settings", icon: Settings },
    { label: "Edit Habit Target", icon: Edit },
    { label: "Edit Custom Message", icon: MessageSquare },
    { label: "Edit Gentle Reminder", icon: Bell },
  ];

  return (
    <div className="flex items-center justify-center p-6 min-h-screen">
      <div className="dashboard-container relative w-full max-w-3xl p-8 md:p-10">
        {/* Step Badge */}
        {/* <div className="step-badge-dashboard absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
          7
        </div> */}

        {/* Header */}
        <header className="mb-10">
          <h1 className="dashboard-title text-2xl font-bold mb-2">Dashboard</h1>
          <p className="dashboard-description text-sm leading-relaxed">
            Your command center for managing habits. Access all features and
            track your progress from one central location.
          </p>
        </header>

        {/* Navigation List */}
        <div className="space-y-6 mb-12">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="dashboard-menu-item flex items-center gap-4 cursor-pointer"
            >
              <item.icon size={25} className="dashboard-icon" />
              <span className="dashboard-link-text text-xl font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Tracker Footer */}
        {/* <div className="flex justify-center">
          <div className="dashboard-footer-pill flex items-center gap-4 px-6 py-2.5 rounded-full">
            <span className="dashboard-step-text text-xs font-bold whitespace-nowrap">
              Step <span className="dashboard-step-highlight">1</span> of 7
            </span>
            <div className="dashboard-progress-track w-24 h-1.5 rounded-full overflow-hidden">
              <div className="dashboard-progress-fill h-full w-[14%]" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
