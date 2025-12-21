import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Import Pages
import LandingPage from './LandingPage';
import PrivacyPolicy from './PrivacyPolicy';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Privacy Policy Route */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}