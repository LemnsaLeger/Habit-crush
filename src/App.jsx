import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useEffect, useState } from "react";

import Header from './components/header.jsx';
import './App.css';
import CreationWizard from './pages/creationWizard.jsx';
import SettingsPage from './components/settingsPage/settings.jsx';
import DashboardPrime from "./pages/dashboard.jsx";
import Today from "./pages/today.jsx";
import ThemeToggler from "./components/themeToggler.jsx";


function App() {

  const [theme, setTheme] = useState("teal");

  useEffect(() => {
    const root = document.documentElement;

    if(theme === "purple") {
      root.classList.add("theme-purple");
    } else {
      root.classList.remove("theme-purple");
    }
  }, [theme]);


  return (
    <BrowserRouter>
      <Header onThemeChange={setTheme} />
      <main>
        <Routes>
          <Route path="/" element={ <DashboardPrime/>  }/>
          <Route path="create-habit" element={<CreationWizard/>}/>
          <Route path="settings" element={<SettingsPage/>}/>
          <Route path="today" element={<Today/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
