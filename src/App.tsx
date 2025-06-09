import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MenuBar from './components/MenuBar/MenuBar';
//import HomePage from './pages/HomePage';
import InicioVideo from './components/Inicio/InicioVideo';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage'; 
import Footer from './components/Footer/Footer';
import './App.css';
// Importa otras páginas...

function App(){
  return (
    <Router>
      <div className="app">
        <Header />
        <MenuBar />
        <main>
        <Routes>
          <Route path="/" element={<InicioVideo />} />
          <Route path="/acerca-de" element={<AboutPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/contactos" element={<ContactPage/>} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;