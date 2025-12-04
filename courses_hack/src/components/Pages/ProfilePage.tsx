import styles from './Pages.module.css';

const ProfilePage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Профиль: Александра Ускова</h1>
      <div className={styles.content}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>АУ</div>
            <div>
              <h2>Александра Ускова</h2>
              <p className={styles.username}>@kkhryvst</p>
            </div>
          </div>
          
          <div className={styles.profileInfo}>
            <div className={styles.infoSection}>
              <h3>Роль:</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>Фронтендер</span>
                <span className={styles.tag}>Дизайнер</span>
              </div>
            </div>
            
            <div className={styles.infoSection}>
              <h3>Опыт:</h3>
              <p>2 победы • 4 хакатона</p>
            </div>
            
            <div className={styles.infoSection}>
              <h3>Навыки:</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>Здшка</span>
                <span className={styles.tag}>Моушн</span>
              </div>
            </div>
            
            <div className={styles.infoSection}>
              <h3>О себе:</h3>
              <p>Ищу классную команду, с которой сможем реализовать классные проекты</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;