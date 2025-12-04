import styles from './Pages.module.css';

const TeamsPage = () => {
  const teams = [
    { id: 1, name: 'МОЯ КОМАНДА Э/Б', members: 4, lookingFor: ['Бэкендер', 'Дизайнер'] },
    { id: 2, name: 'Quantum Coders', members: 3, lookingFor: ['Фронтендер'] },
    { id: 3, name: 'Data Wizards', members: 5, lookingFor: ['Аналитик'] },
    { id: 4, name: 'AI Masters', members: 2, lookingFor: ['ML Engineer', 'Дизайнер'] },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Найти команду</h1>
      <div className={styles.content}>
        <p>Ищете команду для участия в хакатоне? Вот доступные команды:</p>
        
        <div className={styles.teamsGrid}>
          {teams.map((team) => (
            <div key={team.id} className={styles.teamCard}>
              <h3>{team.name}</h3>
              <p className={styles.members}>Участников: {team.members}/5</p>
              <div className={styles.lookingFor}>
                <span>Ищут:</span>
                <div className={styles.tags}>
                  {team.lookingFor.map((role, index) => (
                    <span key={index} className={styles.tag}>{role}</span>
                  ))}
                </div>
              </div>
              <button className={styles.joinButton}>Присоединиться</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;