import { SmilePlus, Palette } from "lucide-react";

import "../index.css";

export default function HabitBasics() {
  return (
    <>
      <section className="new-habit basics border-2 border-teal-600 p-4 rounded-lg bg-[220 16% 14%]  flex flex-col gap-4 relative text-start mt-12">
        <div className="count w-5 absolute h-5 top-0 left-0 bg-teal-900 p-5 flex justify-center items-center rounded-xl shadow-2xl shadow-teal-300">
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
              {/* <p>Multi-step configuration</p> */}
              <input type="text" placeholder="e.g., Morning Meditation" />
            </div>
          </div>
          {/* <p>Create habits that stick to our giant habit control</p> */}
        </article>

        {/* icon */}
        <article className="first-card-title basics">
          <div className="article-header flex gap-4">
            <div className="logo">
              <SmilePlus />
            </div>
            <div className="info">
              <h3>Icon</h3>
              <input type="text" placeholder="Click to choose an icon" />
            </div>
          </div>
          {/* <p>Create habits that stick to our giant habit control</p> */}
        </article>

        <article className="first-card-title basics">
          <div className="article-header flex gap-10">
            <div className="logo">
              <Palette />
            </div>
            <div className="info">
              <h3>Theme Color</h3>
              <div>
                <p className="teal-dot active"></p>
                <p className="purple-dot"></p>
                <p className="orange-dot"></p>
                <p className="lemon-green-dot"></p>
              </div>
            </div>
          </div>
          {/* <p>Create habits that stick to our giant habit control</p> */}
        </article>
        <div className="buttons basics">
          <button>
            {/* <span>icon</span> */}
            Next: Choose Type
          </button>
          <button>Back To Start</button>
        </div>
      </section>
    </>
  );
}
