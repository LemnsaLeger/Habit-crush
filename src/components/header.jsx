import { Link } from "react-router-dom";
import ThemeToggler from "./themeToggler";
import {Home, Plus, Settings } from "lucide-react";

export default function Header({ onThemeChange }) {
    return (
      <>
        <header id="header">
          <nav>
            <div className="logo-container">
              <h1>HabitCrush</h1>
              <p>Create lasting habits.</p>
            </div>

            {/* navigation links */}
            <ul className="flex items-center gap-2" role="list">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                >
                  <Home size={18} aria-hidden="true" />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/create-habit"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus size={18} aria-hidden="true" />
                  <span className="text-sm font-medium">Create Habit</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                >
                  <Settings size={18} aria-hidden="true" />
                  <span className="text-sm font-medium">Settings</span>
                </Link>
              </li>
            </ul>
            <ThemeToggler onThemeChange={onThemeChange} />
          </nav>
        </header>
      </>
    );
}