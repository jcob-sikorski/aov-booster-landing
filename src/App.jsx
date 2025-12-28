import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Import Pages
import LandingPage from './LandingPage';
import PrivacyPolicy from './PrivacyPolicy';

function BlogRedirect() {
  const location = useLocation();
  
  useEffect(() => {
    // Redirect to blog on the separate domain
    window.location.href = `https://www.boostaov.com${location.pathname}${location.search}`;
  }, []);
  
  return <div>Redirecting to blog...</div>;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Privacy Policy Route */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          
          {/* Blog Routes - Redirect to separate blog deployment */}
          <Route path="/blog/*" element={<BlogRedirect />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}