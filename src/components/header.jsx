import ThemeToggler from "./themeToggler";

export default function Header() {
    return(
        <>
            <header>
                <nav>
                    <div className="logo-container">
                        <h1>HabitCrush</h1>
                        <p>Create lasting habits.</p>
                    </div>
                    <ThemeToggler />
                </nav>
            </header>
        </>
    )
}