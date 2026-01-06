// import { Clock,  } from "lucide-react";
import React from "react";
import { Clock, Hash, TrendingUp } from "lucide-react";


import "../index.css";

export default function HabitTypeSelection({ active, habit, setHabit, onNext, onBack }) {
  return (
    <>
      <section
        className={`new-habit ${
          active ? "ring-2 ring-[hsl(var(--border))]" : ""
        } type min-h-auto max-h-screen p-4 w-full relative`}
      >
        <div className="count absolute w-5  h-5 bg-teal-900 p-5 flex justify-center items-center rounded-xl shadow-2xl shadow-teal-300">
          3
        </div>
        <h2 className="mt-10">Habit Type Selection</h2>
        <p className="welcome-board w-full rounded">
          Welcome to your Habit creation wizard.
        </p>
        {/* habit time */}
        <article className="first-card-title type ">
          <div className="article-header flex gap-4">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={habit.type === "time"}
                onChange={() => setHabit({ ...habit, type: "time" })}
              />
              <span className="checkmark"></span>
            </label>
            {/* <div className="logo">T</div> */}
            <div className="info">
              <h3>
                <Clock />
                Time-Based
              </h3>
              <p>Track duration(e.g., 30 minutes of reading)</p>
            </div>
          </div>
        </article>

        <article className="first-card-title type">
          <div className="article-header flex gap-4">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={habit.type === "quantity"}
                onChange={() => setHabit({ ...habit, type: "quantity" })}
              />
              <span className="checkmark"></span>
            </label>
            {/* <div className="logo">T</div> */}
            <div className="info">
              <h3>
                <Hash />
                Quantity-Based
              </h3>
              <p>Track counts(e.g., 8 glasses of water)</p>
            </div>
          </div>
          {/* <p>Create habits that stick to our giant habit control</p> */}
        </article>

        <article className="first-card-title type">
          <div className="article-header flex gap-4">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={habit.type === "value"}
                onChange={() => setHabit({ ...habit, type: "value" })}
              />
              <span className="checkmark"></span>
            </label>
            {/* <div className="logo">T</div> */}
            <div className="info">
              <h3>
                <TrendingUp />
                Value-Based
              </h3>
              <p>Track metrics(e.g., weight, mood rating)</p>
            </div>
          </div>
          {/* <p>Create habits that stick to our giant habit control</p> */}
        </article>

        <article className="first-card-title small-rectanagle h-15">
          <div className="article-header">
            <div className="logo last-div">💡</div>
            <p>The input field will adjust based on your selection.</p>
          </div>
        </article>
        <div className="buttons type">
          <button onClick={onNext}>Next: Set Target</button>
          <button onClick={onBack}>Back To Basics</button>
        </div>
      </section>
    </>
  );
}
