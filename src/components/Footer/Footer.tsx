import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import './FooterStyle.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Mundo Animal - Tu Mejor Amigo</h3>
        <p>© 2025 Todos los derechos reservados</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;