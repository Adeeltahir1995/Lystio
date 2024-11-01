import React from 'react';
import User from '../../assets/user.svg';
import Logo from '../../assets/logo.svg';

import styles from './index.module.css';

const Header = ({ searchText, onSearchChange }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}><Logo /></div>

      <div className={styles.searchContainer}>
        <input 
          type="text" 
          className={styles.searchInput} 
          placeholder="Search by title" 
          value={searchText} 
          onChange={onSearchChange}
        />
        <button className={styles.searchButton}>🔍</button>
      </div>

      <div className={styles.profileSection}>
        <User />
      </div>
    </header>
  );
};

export default Header;
