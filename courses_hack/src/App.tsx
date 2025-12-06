import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import "./Reset.css";
import "./App.css";
import { useUserStore } from './store/userStore';
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage";
import HackathonsPage from "./components/Pages/HackathonPage/HackathonsPage";
import ParticipantsPage from "./components/Pages/ParticipantsPage/ParticipantsPage";
import TeamsPage from "./components/Pages/TeamPage/TeamsPage";
import NotificationsPage from "./components/Pages/NotificationsPage";
import ProfileFormPage from "./components/Pages/ProfileFormPage/ProfileFormPage";


const ProtectedLayout = () => {
  const { currentUser } = useUserStore();
  const isProfileFilled = currentUser?.hasFilledProfile === true;
  
  if (!isProfileFilled) {
    return <Navigate to="/register" replace />;
  }
  
  return <MainLayout />;
};


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<ProfileFormPage />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="participants" element={<ParticipantsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="hackathons" element={<HackathonsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
}

export default App;
