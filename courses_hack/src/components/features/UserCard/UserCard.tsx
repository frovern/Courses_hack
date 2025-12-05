// src/components/features/UserCard/UserCard.tsx
import type { User } from '../../../types';


interface UserCardProps {
  user: User;
  onInvite: (userId: string) => void;
}

const UserCard = ({ user, onInvite }: UserCardProps) => {
  const getDisplayName = () => {
    return user.fullName || user.username;
  };
  
  const getAvatarLetter = () => {
    const name = user.fullName || user.username;
    return name.charAt(0).toUpperCase();
  };
  
  const getExperienceText = () => {
    const parts = [];
    if (user.hackathonsCount !== undefined) {
      parts.push(`${user.hackathonsCount} хакатонов`);
    }
    if (user.wins !== undefined && user.wins > 0) {
      parts.push(`${user.wins} побед`);
    }
    return parts.length > 0 ? `Опыт: ${parts.join(', ')}` : 'Опыт не указан';
  };
  
  if (!user.hasFilledProfile) {
    return (
      <div>
        <div>
          <p>Профиль не заполнен</p>
          <p>{user.username}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
          {getAvatarLetter()}
        </div>
        <div>
          <h3>{getDisplayName()}</h3>
          <p>@{user.username.replace('@', '')}</p>
          
          {user.role && (
            <p>
              Роль: {user.customRole || user.role}
            </p>
          )}
          
          <p>
            {getExperienceText()}
          </p>
          
          {user.createdAt && (
            <p>
              Зарегистрирован: {new Date(user.createdAt).toLocaleDateString('ru-RU')}
            </p>
          )}
        </div>
      </div>
      
      {user.bio && (
        <div>
          <p>{user.bio}</p>
        </div>
      )}
      
      {user.skills && user.skills.length > 0 && (
        <div>
          <h4>Навыки:</h4>
          <div>
            {user.skills.map(skill => (
              <span key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <button 
        onClick={() => onInvite(user.id)}
      >
        Пригласить в команду
      </button>
    </div>
  );
};

export default UserCard;