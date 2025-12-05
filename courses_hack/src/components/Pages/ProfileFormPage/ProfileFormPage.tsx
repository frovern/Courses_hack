import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../store/userStore';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { currentUser, setUser } = useUserStore();

  const roles = ['Фронтендер', 'Бэкендер', 'Дизайнер', 'Аналитик'];
  
  const [name, setName] = useState(currentUser?.fullName || '');
  const [role, setRole] = useState(currentUser?.role || '');
  const [wins, setWins] = useState(currentUser?.wins || 0);
  const [hackathons, setHackathons] = useState(currentUser?.hackathonsCount || 0);
  const [bio, setBio] = useState(currentUser?.bio || '');
  
  const handleSave = () => {

    const isNewUser = !currentUser?.hasFilledProfile;

    const userData = {
      id: currentUser?.id || Date.now().toString(),
      telegramId: currentUser?.telegramId || 'temp_id',
      username: currentUser?.username || '@user',
      fullName: name,
      role: role,
      wins: wins,
      hackathonsCount: hackathons,
      bio: bio,
      hasFilledProfile: true,
      skills: currentUser?.skills || [],
    };
    
    setUser(userData);

    if (isNewUser) {
      navigate('/hackathons');
    } else {
      navigate('/profile');
    }
  };
  
  return (
    <div>
      <h1>Анкета</h1>
      
      <div>
        <div>
          <label>Имя:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
          />
        </div>
        
        <div>
          <label>Роль:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Выберите роль</option>
            {roles.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Победы:</label>
          <input
            type="number"
            value={wins}
            onChange={(e) => setWins(Number(e.target.value))}
            min="0"
          />
        </div>
        
        <div>
          <label>Хакатонов:</label>
          <input
            type="number"
            value={hackathons}
            onChange={(e) => setHackathons(Number(e.target.value))}
            min="0"
          />
        </div>
        
        <div>
          <label>О себе:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Расскажите о себе"
          />
        </div>
        
        <button onClick={handleSave}>
          {currentUser ? 'Сохранить изменения' : 'Сохранить и продолжить'}
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;