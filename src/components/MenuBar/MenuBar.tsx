import styles from './styles.module.css';
import MenuItem from './MenuItem';

const MenuBar = () => {
  return (
    <nav className={styles.menuContainer}>
      <MenuItem to="/" text="Inicio" />
      <MenuItem to="/acerca-de" text="Acerca de" />
      <MenuItem to="/servicios" text="Servicios" />
      <MenuItem to="/contactos" text="Contacto" />
    </nav>
  );
};

export default MenuBar;