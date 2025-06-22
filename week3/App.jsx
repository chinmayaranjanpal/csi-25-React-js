import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Kanban from './pages/Kanban';
import Sidebar from './components/Sidebar';
import ThemeContextProvider from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-grow p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/kanban" element={<Kanban />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeContextProvider>
  );
}
