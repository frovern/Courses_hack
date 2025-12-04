import styles from './Pages.module.css';

const HackathonsPage = () => {
  const hackathons = [
    { id: 1, name: 'AI Hack Moscow', date: '18-17 декабря 2025', location: 'Москва, Россия • Онлайн' },
    { id: 2, name: 'IT World 2025', date: 'Март 2025', location: 'Санкт-Петербург' },
    { id: 3, name: 'HatGO 2024', date: 'Октябрь 2024', location: 'Онлайн' },
    { id: 4, name: 'FRAME ME 2024', date: 'Август 2024', location: 'Казань' },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Хакатоны</h1>
      <div className={styles.content}>
        <div className={styles.hackathonsList}>
          {hackathons.map((hackathon) => (
            <div key={hackathon.id} className={styles.hackathonCard}>
              <h3>{hackathon.name}</h3>
              <p className={styles.date}>{hackathon.date}</p>
              <p className={styles.location}>{hackathon.location}</p>
              <button className={styles.joinButton}>Принять участие</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackathonsPage;