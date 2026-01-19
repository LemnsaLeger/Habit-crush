import { useState } from "react";

import { SmilePlus, Palette } from "lucide-react";
import IconsOverlay from "./iconsOverlay";

import "../index.css";

export default function HabitBasics({ active, habit, setHabit , onNext, onBack})
 {
  const [showIcons, setShowIcons] = useState(false);
  const isValid = habit.name.trim() && habit.icon && habit.color;

  return (
    <>
      <section
        className={`new-habit ${
          active ? "ring-2 ring-[hsl(var(--border))]" : ""
        } p-4 rounded-lg bg-[220 16% 14%]  flex flex-col gap-4 relative text-start mt-12`}
      >
        <div
          className={`count
                      ${
                        active
                          ? "bg-[hsl(var(--accent))]  shadow-teal-300"
                          : "bg-[hsl(var(--muted))]"
                      } w-5 absolute h-5 top-0 left-0 p-5 flex justify-center items-center rounded-xl shadow-2xl `}
        >
          2
        </div>
        <h2 className="mt-10">Habit Basics</h2>
        <p className="welcome-board w-full rounded">
          Welcome to your Habit creation wizard.
        </p>
        {/* habit name */}
        <article className="first-card-title basics">
          <div className="article-header flex gap-4">
            <div className="logo t">T</div>
            <div className="info">
              <h3>Habit Name</h3>
              <input
                type="text"
                placeholder="e.g., Morning Meditation"
                onChange={(e) => setHabit({ ...habit, name: e.target.value })}
                value={habit.name}
              />
            </div>
          </div>
          {/* <p>Create habits that stick to our giant habit control</p> */}
        </article>

        {/* icon */}
        <article className="first-card-title basics relative">
          <div className="article-header flex gap-4">
            <div className="logo">
              <SmilePlus />
            </div>

            <div className="info">
              <h3>Icon</h3>
              <input
                type="text"
                placeholder="Click to choose an icon"
                readOnly
                value={habit.icon || ""}
                onClick={() => setShowIcons(true)}
              />
            </div>
          </div>

          {showIcons && (
            <IconsOverlay
              selectedIcon={habit.icon}
              onSelectIcon={(iconId) => {
                setHabit({ ...habit, icon: iconId });
                setShowIcons(false);
              }}
            />
          )}
        </article>

        <article className="first-card-title basics">
          <div className="article-header flex gap-10">
            <div className="logo">
              <Palette />
            </div>
            <div className="info">
              <h3>Theme Color</h3>
              <div>
                <p
                  className={`teal-dot ${
                    habit.color === "teal" ? "active" : ""
                  }`}
                  onClick={() => setHabit({ ...habit, color: "teal" })}
                ></p>
                <p
                  className={`purple-dot ${
                    habit.color === "purple" ? "active" : ""
                  }`}
                  onClick={() => setHabit({ ...habit, color: "purple" })}
                ></p>
                <p
                  className={`orange-dot ${
                    habit.color === "orange" ? "active" : ""
                  }`}
                  onClick={() => setHabit({ ...habit, color: "orange" })}
                ></p>

                <p
                  className={`lemon-green-dot ${
                    habit.color === "lemon-green" ? "active" : ""
                  }`}
                  onClick={() => setHabit({ ...habit, color: "lemon-green" })}
                ></p>
              </div>
            </div>
          </div>
          {/* <p>Create habits that stick to our giant habit control</p> */}
        </article>
        <div className="buttons basics">
          <button disabled={!isValid} onClick={onNext}>
            {/* <span>icon</span> */}
            Choose Type
          </button>
          <button onClick={onBack}>Back To Start</button>
        </div>
      </section>
    </>
  );
}
