import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar'; // ✅ Import Navbar
import ArtisanDetails from './pages/ArtisanDetails'; // if it's now a real page
import HomePage from './pages/Home'; // Add this once Home is built
import ProfilePage from './pages/Profile';
import FAQPage from './pages/Faq';
import AboutPage from './pages/About';
import TermsPage from './pages/Terms';

// Wrapper to conditionally show navbar
const LayoutWithNavbar = ({ children }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/login', '/signup'];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <LayoutWithNavbar>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/artisan/:id" element={<ArtisanDetails />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </LayoutWithNavbar>
    </Router>
  );
}

export default App;
