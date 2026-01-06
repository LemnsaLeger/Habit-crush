import { BrowserRouter, Routes, Route} from "react-router-dom";

import Header from './components/header';
import './App.css';
import CreationWizard from './pages/creationWizard';
import SettingsPage from './components/settingsPage/settings';
import DashboardPrime from "./pages/dashboard";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={ <DashboardPrime/>  }/>
          <Route path="create-habit" element={<CreationWizard/>}/>
          <Route path="settings" element={<SettingsPage/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
