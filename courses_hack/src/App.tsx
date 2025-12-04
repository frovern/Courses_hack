import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import './Reset.css'
import './App.css';
import ProfilePage from './components/Pages/ProfilePage'
import HackathonsPage from './components/Pages/HackathonsPage';
import ParticipantsPage from './components/Pages/ParticipantsPage';
import TeamsPage from './components/Pages/TeamsPage';


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/hackathons" element={<HackathonsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/participants" element={<ParticipantsPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
