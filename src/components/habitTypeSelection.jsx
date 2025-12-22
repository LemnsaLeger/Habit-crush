// import { Clock,  } from "lucide-react";
import React from "react";
import { Clock, Hash, TrendingUp } from "lucide-react";


import "../index.css";

export default function HabitTypeSelection() {
  return (
    <>
      <section className="new-habit border-2 border-teal-600 p-4 rounded-lg bg-[220 16% 14%]  flex flex-col gap-4 relative text-start mt-12">
        <div className="count w-5 absolute h-5 top-0 left-0 bg-teal-900 p-5 flex justify-center items-center rounded-xl shadow-2xl shadow-teal-300">
          3
        </div>
        <h2 className="mt-10">Habit Type Selection</h2>
        <p className="welcome-board w-full rounded">
          Welcome to your Habit creation wizard.
        </p>
        {/* habit name */}
        <article className="first-card-title type">
          <div className="article-header flex gap-4">
            <label className="custom-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            {/* <div className="logo">T</div> */}
            <div className="info">
              <h3>
                <Clock />
                Time-Based
              </h3>
              <p>Track duration(e.g., 30 minutes of reading)</p>
              {/* <p>Multi-step configuration</p> */}
              {/* <input type="text" placeHolder="e.g., Morning Meditation" /> */}
            </div>
          </div>
          {/* <p>Create habits that stick to our giant habit control</p> */}
        </article>

        <article className="first-card-title type">
          <div className="article-header flex gap-4">
            <label className="custom-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            {/* <div className="logo">T</div> */}
            <div className="info">
              <h3>
                <Hash />
                Quantity-Based
              </h3>
              <p>Track counts(e.g., 8 glasses of water)</p>
              {/* <p>Multi-step configuration</p> */}
              {/* <input type="text" placeHolder="e.g., Morning Meditation" /> */}
            </div>
          </div>
          {/* <p>Create habits that stick to our giant habit control</p> */}
        </article>

        <article className="first-card-title type">
          <div className="article-header flex gap-4">
            <label className="custom-checkbox">
              <input type="checkbox" />
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
          {/* <p>Create habits that stick to our giant habit control</p> */}
        </article>
        <div className="buttons type">
          <button>
            {/* <span>icon</span> */}
            Next: Set Target
          </button>
          <button>Back To Basics</button>
        </div>
      </section>
    </>
  );
}
