import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MenuBar from './components/MenuBar/MenuBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage'; 
import Footer from './components/Footer/Footer';
import ChatBot from './components/ChatBot'; // Importa tu ChatBot
import './App.css';
import { useState } from 'react';



function App(){
  const [showChat, setShowChat] = useState(false);

  return (
    <Router>
      <div className="app">
        <Header />
        <MenuBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/acerca-de" element={<AboutPage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/contactos" element={<ContactPage/>} />
          </Routes>
        </main>
        <Footer />

        {/* Botón flotante y ChatBot */}
        <button
          className="chatbot-float-btn"
          onClick={() => setShowChat(v => !v)}
          aria-label="Abrir chat"
        >
          💬
        </button>
        {showChat && (
          <div className="chatbot-float-window">
            <ChatBot />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

