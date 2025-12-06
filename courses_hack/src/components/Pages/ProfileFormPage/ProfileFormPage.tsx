import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../store/userStore';
import styles from './ProfileFormPage.module.css';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { currentUser, setUser } = useUserStore();

  const predefinedRoles = ['Фронтендер', 'Бэкендер', 'Дизайнер', 'Аналитик', 'Другое'];
  
  const [name, setName] = useState(currentUser?.fullName || '');
  const [role, setRole] = useState(currentUser?.role || '');
  const [customRole, setCustomRole] = useState(currentUser?.customRole || '');
  const [wins, setWins] = useState(currentUser?.wins?.toString() || '');
  const [hackathons, setHackathons] = useState(currentUser?.hackathonsCount?.toString() || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  
  const isOtherRole = role === 'Другое';
  
  const handleSave = () => {
    const isNewUser = !currentUser?.hasFilledProfile;

    const userData = {
      id: currentUser?.id || Date.now().toString(),
      telegramId: currentUser?.telegramId || 'temp_id',
      username: currentUser?.username || '@user',
      fullName: name,
      role: isOtherRole ? customRole : role,
      customRole: isOtherRole ? customRole : undefined,
      wins: wins ? parseInt(wins, 10) : 0,
      hackathonsCount: hackathons ? parseInt(hackathons, 10) : 0,
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
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>
          {currentUser?.hasFilledProfile ? 'Редактировать профиль' : 'Заполните анкету'}
        </h1>
        
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Имя</label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше имя"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Роль</label>
            <select 
              className={styles.select}
              value={role} 
              onChange={(e) => {
                setRole(e.target.value);
                if (e.target.value !== 'Другое') {
                  setCustomRole('');
                }
              }}
            >
              <option value="">Выберите роль</option>
              {predefinedRoles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            
            {isOtherRole && (
              <div className={styles.customRoleContainer}>
                <input
                  className={styles.input}
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="Введите свою роль"
                />
              </div>
            )}
          </div>
          
          <div className={styles.statsRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Победы</label>
              <input
                className={styles.input}
                type="text"
                value={wins}
                onChange={(e) => setWins(e.target.value)}
                placeholder="0"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Хакатонов</label>
              <input
                className={styles.input}
                type="text"
                value={hackathons}
                onChange={(e) => setHackathons(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>О себе</label>
            <textarea
              className={styles.textarea}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Расскажите о себе..."
            />
          </div>
          
          <button className={styles.button} onClick={handleSave}>
            {currentUser?.hasFilledProfile ? 'Сохранить изменения' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;