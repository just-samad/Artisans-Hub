import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ArtisanDetails from './pages/ArtisanDetails';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import FAQPage from './pages/Faq';
import AboutPage from './pages/About';
import TermsPage from './pages/Terms';
import UserProfile from './pages/userprofile';
import OtpPage from './pages/Otp';
import ForgotPasswordPage from './pages/ForgotPassword';
import ContactUsPage from './pages/ContactUs';
import NotFoundPage from './pages/NotFound';
import AdminDashboardPage from './pages/AdminDashboard';

// Private route wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

// Wrapper to conditionally show navbar
const LayoutWithNavbar = ({ children }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/login', '/signup', '/otp', '/forgot'];

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
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/artisan/:id" element={<ArtisanDetails />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
          

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <ContactUsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </LayoutWithNavbar>
    </Router>
  );
}

export default App;