import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import './Reset.css'
import './App.css';
import ProfilePage from './components/Pages/ProfilePage'
import HackathonsPage from './components/Pages/HackathonsPage';
import ParticipantsPage from './components/Pages/ParticipantsPage';
import TeamsPage from './components/Pages/TeamsPage';
import NotificationsPage from './components/Pages/NotificationsPage'


function App() {
  return (
<Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="participants" element={<ParticipantsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="hackathons" element={<HackathonsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
