import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from "./pages/Auth/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import HomePage from "./pages/home/HomePage";
import RoomTypePage from "./pages/home/RoomTypePage";
import RoomsByTypePage from "./pages/home/RoomsByTypePage";
import RoomDetailPage from "./pages/home/RoomDetailPage";
import BookingPage from "./pages/home/BookingPage";
import MyBookingsPage from "./pages/user/MyBookingsPage";
import ProfilePage from "./pages/user/ProfilePage";
import RoomPage from "./pages/home/RoomPage";
import ContactPage from "./pages/info/ContactPage";
import AboutPage from "./pages/info/AboutPage";

// Separate Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// App with routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Protected Routes */}
      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
      <Route path="/room-types" element={
        <ProtectedRoute>
          <RoomTypePage />
        </ProtectedRoute>
      } />
      <Route path="/rooms/type/:typeId" element={
        <ProtectedRoute>
          <RoomsByTypePage />
        </ProtectedRoute>
      } />
      <Route path="/rooms/:roomId" element={
        <ProtectedRoute>
          <RoomDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/booking/:roomId" element={
        <ProtectedRoute>
          <BookingPage />
        </ProtectedRoute>
      } />
      <Route path="/my-bookings" element={
        <ProtectedRoute>
          <MyBookingsPage />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/rooms" element={
        <ProtectedRoute>
          <RoomPage/>
        </ProtectedRoute>
      } />

<Route path="/about" element={
        <ProtectedRoute>
          <AboutPage/>
        </ProtectedRoute>
      } />

      <Route path="contact" element={
        <ProtectedRoute>
          <ContactPage/>
        </ProtectedRoute>
      } />
      
    </Routes>
  );
};

// Main App component
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;