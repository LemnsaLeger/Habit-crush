

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Plus, Settings, Menu, X, CalendarCheck } from "lucide-react";
import ThemeToggler from "./themeToggler";
import "../pages/styles/header.css";

export default function Header({ onThemeChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header-main">
      <nav className="header-nav" aria-label="Main navigation">
        {/* Logo Section */}
        <Link
          to="/"
          className="logo-container flex items-center gap-3"
          onClick={closeMenu}
        >
          <div
            className="w-10 h-10 bg-linear-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-6 h-6 grid grid-cols-2 gap-1">
              <div className="bg-white/90 rounded-sm"></div>
              <div className="bg-white/90 rounded-sm"></div>
              <div className="bg-white/90 rounded-sm"></div>
              <div className="bg-white/60 rounded-sm"></div>
            </div>
          </div>
          <div>
            <h1 className="header-title">Habit Tracker</h1>
            <p className="header-subtitle">Build lasting habits</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-navigation">
          <ul className="flex items-center gap-2" role="list">
            <li>
              <Link
                to="/today"
                className="nav-link flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              >
                <CalendarCheck size={18} aria-hidden="true" />
                <span className="text-sm font-medium">Today</span>
              </Link>
            </li>

            <li>
              <Link to="/" className="nav-link">
                <Home size={18} aria-hidden="true" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/create-habit" className="nav-link">
                <Plus size={18} aria-hidden="true" />
                <span className="text-sm font-medium">Create Habit</span>
              </Link>
            </li>

            <li>
              <Link to="/settings" className="nav-link">
                <Settings size={18} aria-hidden="true" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </li>
          </ul>

          <ThemeToggler onThemeChange={onThemeChange} />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="hamburger-button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ?
            <X size={24} />
          : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <aside
        className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
      >
        <nav>
          <ul className="flex flex-col gap-2" role="list">
            <li>
              <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
                <Home size={20} aria-hidden="true" />
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/create-habit"
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                <Plus size={20} aria-hidden="true" />
                <span>Create Habit</span>
              </Link>
            </li>

            <li>
              <Link
                to="/settings"
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                <Settings size={20} aria-hidden="true" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>

          <div
            className="mt-6 pt-6 border-t"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <ThemeToggler onThemeChange={onThemeChange} />
          </div>
        </nav>
      </aside>
    </header>
  );
}
