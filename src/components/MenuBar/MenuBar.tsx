import React from 'react';
import styles from './styles.module.css';
import MenuItem from './MenuItem';

const MenuBar = () => {
  return (
    <nav className={styles.menuContainer}>
      <MenuItem to="/" text="Inicio" />
      <MenuItem to="/contenido" text="Contenido" />
      <MenuItem to="/servicios" text="Servicios" />
      <MenuItem to="/contacto" text="Contacto" />
      <MenuItem to="/acerca-de" text="Acerca de" />
    </nav>
  );
};

export default MenuBar;