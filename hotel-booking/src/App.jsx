
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Auth/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import HomePage from "./pages/home/HomePage";
import RoomDetailPage from "./pages/home/RoomDetailPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/rooms/:roomId" element={<RoomDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
