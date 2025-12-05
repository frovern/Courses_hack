// src/components/pages/ProfilePage.tsx
import { useUserStore } from '../../store/userStore';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser } = useUserStore();
  
  if (!currentUser) {
    return (
      <div>
        <h2>Профиль не найден</h2>
        <p>Пожалуйста, заполните анкету</p>
        <Link to="/register">Заполнить анкету</Link>
      </div>
    );
  }
  
  if (!currentUser.hasFilledProfile) {
    return (
      <div>
        <h2>Профиль не заполнен</h2>
        <p>Пожалуйста, заполните анкету</p>
        <Link to="/register">Заполнить анкету</Link>
      </div>
    );
  }
  
  return (
    <div>
      <h1>Мой профиль</h1>
      
      <div>
        <div>
          <h2>{currentUser.fullName}</h2>
          <p>Telegram: {currentUser.username}</p>
        </div>

        {currentUser.role && (
          <div>
            <h3>Роль:</h3>
            <p>{currentUser.customRole || currentUser.role}</p>
          </div>
        )}
        
        {(currentUser.wins !== undefined || currentUser.hackathonsCount !== undefined) && (
          <div>
            <h3>Опыт:</h3>
            {currentUser.hackathonsCount !== undefined && (
              <p>Участий в хакатонах: {currentUser.hackathonsCount}</p>
            )}
            {currentUser.wins !== undefined && (
              <p>Побед: {currentUser.wins}</p>
            )}
          </div>
        )}
        
        {currentUser.bio && (
          <div>
            <h3>О себе:</h3>
            <p>{currentUser.bio}</p>
          </div>
        )}

        {currentUser.skills && currentUser.skills.length > 0 && (
          <div>
            <h3>Навыки:</h3>
            <div>
              {currentUser.skills.map(skill => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <Link to="/register">Редактировать профиль</Link>
      </div>
    </div>
  );
};

export default ProfilePage;