import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Squares from './components/Squares';
import { NavbarProvider } from './contexts/NavbarContext';
import { useTheme } from './contexts/ThemeContext';

// Pages
import Home from './pages/Home';

function App() {
  const { theme } = useTheme();
  const location = useLocation();

  return (
    <NavbarProvider>
      <div className="relative min-h-screen bg-[#020403] transition-colors duration-500 overflow-hidden">
        {/* Global Background Animation */}
        <div className="fixed inset-0 z-0">
          <Squares
            speed={0.2}
            squareSize={35}
            direction="diagonal"
            borderColor={theme === 'dark' ? "rgba(16, 185, 129, 0.07)" : "rgba(16, 185, 129, 0.07)"}
            hoverFillColor={theme === 'dark' ? "rgba(16, 185, 129, 0.22)" : "rgba(16, 185, 129, 0.22)"}
            gradientColorStart={theme === 'dark' ? "#020403" : "#020403"}
            gradientColorEnd={theme === 'dark' ? "#062415" : "#062415"}
          />
        </div>

        <Header />

        {/* Page Routing with Transitions */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </NavbarProvider>
  );
}

export default App;
