import { useState } from "react";
import { ArrowLeft, Palette, Bell, Database, Monitor, User, ChevronRight, ChevronDown, Clock, Download, Upload, Trash2 } from "lucide-react";
import "../../index.css";
import { useNavigate } from "react-router-dom";


export default function SettingsPage() {

    const navigate = useNavigate();
    const [activeSelection, setActiveSelection] = useState("theme");
    const [selectedTheme, setSelectedTheme] = useState("teal");
    const [animationsnabled, setAnimationsEnabled] = useState(true);
    const [remindersEnabled, setRemindersEnabled] = useState(true);
    const [reminderTime, setReminderTime] = useState('10:07');


    const handleThemeChange = (theme) => {
        setSelectedTheme(theme);

        // apply  the theme to dom
        if (theme === "teal") {
            document.documentElement.classList.remove("theme-purple");
        } else {
            document.documentElement.classList.add("theme-teal");
        }
    };


    const menuItems = [
      { id: "theme", icon: Palette, label: "Theme & Appearance", active: true },
      { id: "reminders", icon: Bell, label: "Reminders", active: false },
      { id: "data", icon: Database, label: "Data Management", active: false },
      {
        id: "display",
        icon: Monitor,
        label: "Display Preferences",
        active: false,
      },
      { id: "account", icon: User, label: "Account", active: false },
    ];


    return (
      <div className=" settings-container min-h-screen mt-10">
        <header className="px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 transition-colors mb-4 go-back"
            arial-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-semibold">Settings</h1>
            <p className="mt-1"></p>
          </div>
        </header>

        {/* main content */}
        <main className=" content flex gap-6 p-8">
          {/* sidebar */}
          <aside className="w-64 shrink-0 ">
            <nav aria-label="Settings Navigation">
              <ul className="space-y-4" role="list">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.id === activeSelection;

                  return (
                    <li key={item.id}>
                      <button
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-[hsl(var(--primary))] text-[hsl(--primary-foreground)]"
                            : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary)) hover:text-[hsl(var(--foreground))]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setActiveSelection(item.id)}
                      >
                        <span className="flex items-center gap-3">
                          <Icon size={18} aria-hidden="true" />
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </span>
                        {/* change chrevon on active item */}
                        {isActive ? (
                          <ChevronDown size={16} aria-hidden="true" />
                        ) : (
                          <ChevronRight size={16} aria-hidden="true" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* content here */}
          <section className="flex-1 p-8">
            {activeSelection === "theme" && (
              <article>
                <header className="flex items-center gap-3 mb-6">
                  <Palette size={24} />
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Theme & Appearance
                    </h2>
                    <p className="text-sm"></p>
                  </div>
                </header>

                {/* color theme selection */}
                <section className="mb-8 color-theme">
                  <h3 className="text-lg font-medium mb-4">Color Theme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/*Teal theme options */}

                    <button
                      onClick={() => setSelectedTheme("teal")}
                      className={`relative p-6 rounded-lg border-2 transition-all ${
                        selectedTheme === "teal"
                          ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10"
                          : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50"
                      }`}
                      aria-pressed={selectedTheme === "teal"}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedTheme === "teal"
                              ? "border-[hsl(var(--primary))]"
                              : "border-[hsl(var(--border))]"
                          }`}
                          role="radio"
                          aria-checked={selectedTheme === "teal"}
                        >
                          {selectedTheme === "teal" && (
                            <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary))]"></div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-[hsl(174,82%,35%)]"></div>
                          <div className="w-8 h-8 rounded-full bg-[hsl(186,93%,48%)]"></div>
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Teal/Cyan</div>
                          <div className="text-sm" id="professional">
                            Professional
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* purple theme */}
                    <button
                      onClick={() => handleThemeChange("purple")}
                      className={`relative p-6 rounded-lg border-2 transition-all ${
                        selectedTheme === "purple"
                          ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10"
                          : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50"
                      }`}
                      aria-pressed={selectedTheme === "purple"}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedTheme === "purple"
                              ? "border-[hsl(var(--primary))]"
                              : "border-[hsl(var(--border))]"
                          }`}
                          role="radio"
                          aria-checked={selectedTheme === "purple"}
                        >
                          {selectedTheme === "purple" && (
                            <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary))]"></div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-[hsl(239,84%,67%)]"></div>
                          <div className="w-8 h-8 rounded-full bg-[hsl(263,70%,72%)]"></div>
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Purple/Indigo</div>
                          <div className="text-sm" id="modern">
                            Modern
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </section>

                {/* /animations section */}
                <section>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Animations</h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        Enable smooth transitions
                      </p>
                    </div>
                    <button
                      role="switch"
                      aria-checked={animationsnabled}
                      onClick={() => setAnimationsEnabled(!animationsnabled)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        animationsnabled
                          ? "bg-[hsl(var(--primary))]"
                          : "bg-[hsl(var(--secondary))]"
                      }`}
                      aria-label="Toggle animations"
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          animationsnabled ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </section>
              </article>
            )}

            {/* reminders tabbed */}
            {activeSelection === "reminders" && (
              <article className="settings-content p-8 rounded-xl">
                <header className="section-header flex items-center gap-3 mt-8">
                  <Bell size={24} aria-hidden="true" className="section-icon" />
                  <div>
                    <h2 className="section-title text-2xl font-semibold">
                      Reminders
                    </h2>
                    <p className="section-description text-sm mt-1">
                      Configure your notification Preferences
                    </p>
                  </div>
                </header>

                {/* enable reminders */}
                <section className="settings-section mb-8">
                  <div className="toggle-row w-full flex items-center justify-between mt-2">
                    <div>
                      <h3 className="subsection-title">Enable Reminders</h3>
                      <p className="toggle-description text-[0.875rem] mt-1">
                        Receive daily habit reminders
                      </p>
                    </div>
                    <button
                      role="switch"
                      aria-checked={remindersEnabled}
                      onClick={() => setAnimationsEnabled(!remindersEnabled)}
                      className={`toggle-switch relative inline-flex h-8 w-14 items-center ${
                        remindersEnabled ? "active" : ""
                      }`}
                      aria-label="Toggle reminders"
                    >
                      <span className="toggle-knob inline-block h-6 w-6 bg-white"></span>
                    </button>
                  </div>
                </section>

                {/* reminder time */}
                <section className="settings-section border-top pt-6">
                  <h3 className="subsection-title text-[1.125rem] font-medium mb-4">
                    Reminder Time
                  </h3>
                  <div className="time-input-wrapper relative inline-flex items-center max-w-40">
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="time-input pr-10 font-medium w-full cursor-pointer text-sm rounded-2xl"
                      disabled={!remindersEnabled}
                      aria-label="set reminder time"
                    />
                  </div>
                </section>
              </article>
            )}

            {/* data tabbed */}
            {activeSelection === "data" && (
              <article className="settings-content p-8 rounded-xl">
                <header className="section-header flex items-center gap-3 mt-8">
                  <Database
                    size={24}
                    className="section-icon"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="section-title text-2xl font-semibold">
                      Data Management
                    </h2>
                    <p className="section-description text-sm mt-1">
                      Export, import, or clear your data
                    </p>
                  </div>
                </header>

                {/* Export and Import Buttons */}
                <section className="settings-section mt-4 mb-8">
                  <div className="data-actions">
                    <button className="action-button secondary">
                      <Download size={18} aria-hidden="true" />
                      <span>Export Data (PDF)</span>
                    </button>
                    <button className="action-button secondary">
                      <Upload size={18} aria-hidden="true" />
                      <span>Import Data[expertise still loading or pay]</span>
                    </button>
                  </div>
                </section>

                {/* Clear All Data */}
                <section className="settings-section mb-8">
                  <button className="action-button destructive">
                    <Trash2 size={18} aria-hidden="true" />
                    <span>Clear All Data</span>
                  </button>
                </section>
              </article>
            )}

            {(activeSelection === "display" ||
              activeSelection === "account") && (
              <article className="settings-content">
                <div className="empty-state">
                  <p className="empty-state-text">
                    {
                      menuItems.find((item) => item.id === activeSelection)
                        ?.label
                    }{" "}
                    section coming soon...
                  </p>
                </div>
              </article>
            )}
          </section>
        </main>
      </div>
    );

}