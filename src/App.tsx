import { Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar/MenuBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
// Importa otras páginas...

const App = () => {
  return (
    <div className="app">
      <MenuBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/acerca-de" element={<AboutPage />} />
        <Route path="/contenido" element={<div>Contenido Page</div>} />
        <Route path="/servicios" element={<div>Servicios Page</div>} />
        <Route path="/contactos" element={<div>Contactos Page</div>} />
      </Routes>
    </div>
  );
};

export default App;