import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import GraderPage from './pages/GraderPage';
import MarketPage from './pages/MarketPage';
import OraclePage from './pages/OraclePage';
import PortfolioPage from './pages/PortfolioPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import CompassPage from './pages/CompassPage';
import ArenaPage from './pages/ArenaPage';
import FuturecastPage from './pages/FuturecastPage';
import './App.css';

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/grader" element={<GraderPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/oracle" element={<OraclePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/compass" element={<CompassPage />} />
            <Route path="/arena" element={<ArenaPage />} />
            <Route path="/futurecasting" element={<FuturecastPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
