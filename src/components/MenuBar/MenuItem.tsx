import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

interface MenuItemProps {
  to: string;
  text: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, text }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        isActive ? `${styles.link} ${styles.active}` : styles.link
      }
    >
      {text}
    </NavLink>
  );
};

export default MenuItem;