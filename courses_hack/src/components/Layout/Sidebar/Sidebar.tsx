import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/profile', label: 'Профиль' },
    { path: '/teams', label: 'Найти команду' },
    { path: '/participants', label: 'Найти участника' },
    { path: '/notifications', label: 'Уведомления' },
    { path: '/hackathons', label: 'Хакатоны' },
  ];

  return (
    <aside className={styles.sidebar}>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.sidebarButton} ${isActive ? styles.active : ''}`}
          >
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;