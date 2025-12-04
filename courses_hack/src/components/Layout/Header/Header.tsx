import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.logoBackground}>
          <span className={styles.logoText}>fasteam</span>
        </div>
      </div>
    </header>
  );
};

export default Header;