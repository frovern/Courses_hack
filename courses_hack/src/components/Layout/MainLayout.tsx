import React, { type ReactNode } from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import styles from './LayoutStyles/Layout.module.css';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.mainContainer}>
        <Sidebar />
        <main className={styles.content}>
          <div className={styles.contentPlaceholder}>
            Здесь будет основной контент страницы
          </div>
          <div className={styles.componentPlaceholder}>
            {children || 'Будут добавлены компоненты позже'}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;