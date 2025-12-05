import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../../../store/userStore';
import styles from './Sidebar.module.css';

import teamsIcon from './icons/team.svg';
import participantsIcon from './icons/participants.svg';
import notificationsIcon from './icons/notification.svg';
import hackathonsIcon from './icons/hackathons.svg';

const Sidebar = () => {
  const location = useLocation();
  const { currentUser } = useUserStore();

  const menuItems = [
    { 
      path: '/teams', 
      label: 'найти команду',
      icon: teamsIcon 
    },
    { 
      path: '/participants', 
      label: 'найти участника',
      icon: participantsIcon 
    },
    { 
      path: '/notifications', 
      label: 'уведомления',
      icon: notificationsIcon 
    },
    { 
      path: '/hackathons', 
      label: 'хакатоны',
      icon: hackathonsIcon 
    },
  ];

  const isProfileActive = location.pathname === '/profile';
  const userName = currentUser?.fullName || currentUser?.username || 'Пользователь';

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileSection}>
        <Link 
          to="/profile" 
          className={`${styles.profileNameLink} ${isProfileActive ? styles.active : ''}`}
        >
          <h3 className={styles.profileName}>
            {userName}
          </h3>
        </Link>
      </div>

      <div className={styles.menu}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.menuButton} ${isActive ? styles.menuActive : ''}`}
            >
              <img 
                src={item.icon} 
                alt="" 
                className={styles.buttonIcon}
              />
              <span className={styles.buttonLabel}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;