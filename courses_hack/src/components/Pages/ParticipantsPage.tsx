import styles from './Pages.module.css';

const ParticipantsPage = () => {
  const participants = [
    { id: 1, name: 'Иван Петров', role: 'Бэкендер', experience: '3 хакатона' },
    { id: 2, name: 'Мария Сидорова', role: 'Дизайнер', experience: '2 победы' },
    { id: 3, name: 'Алексей Иванов', role: 'Фронтендер', experience: '5 хакатонов' },
    { id: 4, name: 'Елена Кузнецова', role: 'Аналитик', experience: '1 победа' },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Найти участника</h1>
      <div className={styles.content}>
        <p>Ищете участников для своей команды? Вот доступные специалисты:</p>
        
        <div className={styles.participantsList}>
          {participants.map((participant) => (
            <div key={participant.id} className={styles.participantCard}>
              <div className={styles.participantInfo}>
                <div className={styles.avatarSmall}>
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3>{participant.name}</h3>
                  <p className={styles.role}>{participant.role}</p>
                  <p className={styles.experience}>{participant.experience}</p>
                </div>
              </div>
              <button className={styles.inviteButton}>Пригласить</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipantsPage;