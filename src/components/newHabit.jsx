

export default function NewHabit({ active, onNext }) {
    return (
      <>
        <section
          className={`new-habit ${
            active ? "ring-2 ring-[hsl(var(--border))]" : ""
          } p-4 rounded-lg bg-[220 16% 14%]  flex flex-col gap-4 relative`}
        >
          <div
            className={`
          ${
            active
              ? "bg-[hsl(var(--accent))] shadow-teal-300"
              : "bg-[hsl(var(--muted))]"
          }

            count absolute w-10 h-10 top-0 left-0 flex justify-center items-center rounded-xl shadow-2xl`}
          >
            1
          </div>
          <h2 className="mt-10">Start New Habit Creation</h2>
          <p className="welcome-board w-full rounded">
            Welcome to your Habit creation wizard.
          </p>
          <article className="first-card-title">
            <div className="article-header flex gap-4">
              <div className="logo">HC</div>
              <div className="info">
                <h3>Launchpad</h3>
                <p>Multi-step configuration</p>
              </div>
            </div>
            <p>Create habits that stick to our giant habit control</p>
          </article>
          <div className="buttons" onClick={onNext}>
            <button className="section-btn">
              {/* <span>icon</span> */}
              Start habit creation
            </button>
            <button>Cancel</button>
          </div>
        </section>
      </>
    );
}