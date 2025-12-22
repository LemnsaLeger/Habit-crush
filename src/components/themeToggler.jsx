import React, { useState } from 'react';
import { Palette } from 'lucide-react';

export default function ThemeToggler ({ onThemeChange }) {
  const [isTeal, setIsTeal] = useState(true);

  const handleToggle = () => {
    const newState = !isTeal;
    setIsTeal(newState);
    if (onThemeChange) {
      onThemeChange(newState ? 'teal' : 'purple');
    }
  }
    return (
      <>
        <aside className="flex items-center justify-center p-10">
          <section className="theme-toggle-wrapper flex items-center gap-4 px-5 py-3 shadow-lg">
            {/* Visual Label */}
            <div className="flex items-center gap-3">
              <Palette size={20} className="theme-toggle-icon" />
              <span className="theme-toggle-label text-sm whitespace-nowrap">
                {isTeal ? "Teal Theme" : "Purple Theme"}
              </span>
            </div>

            {/* Semantic Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={isTeal}
              onClick={handleToggle}
              className="theme-switch-track flex items-center"
              aria-label="Toggle between Teal and Purple themes"
            >
              <span className="theme-switch-knob" />
            </button>
          </section>
        </aside>
      </>
    );
}