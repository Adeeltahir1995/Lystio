import React from 'react';
import styles from './index.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>lystio</div>

      <div className={styles.searchContainer}>
        <input type="text" className={styles.searchInput} placeholder="Search" />
        <button className={styles.searchButton}>🔍</button>
      </div>

      <div className={styles.profileSection}>
        <span className={styles.icon}>🌐</span>
        <span className={styles.icon}>👤</span>
      </div>
    </header>
  );
};

export default Header;
