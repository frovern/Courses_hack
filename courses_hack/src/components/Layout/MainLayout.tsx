import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import styles from './LayoutStyles/Layout.module.css';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.mainContainer}>
        <Sidebar />
        <main className={styles.content}>
          <div className={styles.outletContainer}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;