import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatBot.css';

type Message = {
  text: string;
  from: 'user' | 'bot';
  timestamp: Date;
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final cuando hay nuevos mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Saludo automático al iniciar el chat
  useEffect(() => {
    const welcomeMessage: Message = {
      text: '¡Hola! Soy tu asistente de IA especializado en mascotas 🐾\n\n¿En qué puedo ayudarte hoy?',
      from: 'bot',
      timestamp: new Date()
    };
    
    // Simular efecto de escritura para el mensaje de bienvenida
    setTimeout(() => {
      setMessages([welcomeMessage]);
    }, 500);
  }, []);

  const simulateTyping = (duration: number = 1500) => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), duration);
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMsg: Message = { 
        text: input, 
        from: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMsg]);
      setLoading(true);
      simulateTyping();

      try {
        const res = await axios.post('http://localhost:3001/api/chatbot', {
          prompt: input,
        });
        
        setTimeout(() => {
          const botMsg: Message = { 
            text: res.data.response, 
            from: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMsg]);
        }, 1000);
        
      } catch (error) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { 
              text: 'Lo siento, ocurrió un error al conectar con el servidor. Por favor, inténtalo de nuevo.', 
              from: 'bot',
              timestamp: new Date()
            }
          ]);
        }, 1000);
      }
      
      setInput('');
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="chatbot-header" onClick={toggleMinimize}>
        <div className="header-content">
          <div className="bot-avatar">🤖</div>
          <div className="header-text">
            <span className="bot-name">PetBot IA</span>
            <span className="bot-status">En línea</span>
          </div>
        </div>
        <button className="minimize-btn">
          {isMinimized ? '▲' : '▼'}
        </button>
      </div>
      
      {!isMinimized && (
        <>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.from}`}>
                <div className={`chatbot-message ${msg.from}`}>
                  <div className="message-content">
                    {msg.text}
                  </div>
                  <div className="message-time">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
                {msg.from === 'bot' && index === 0 && (
                  <div className="message-avatar">🐾</div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="message-wrapper bot">
                <div className="chatbot-message bot typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <div className="input-wrapper">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pregunta sobre el cuidado de tu mascota..."
                disabled={loading}
                rows={1}
                className="message-input"
              />
              <button 
                onClick={handleSend} 
                disabled={loading || !input.trim()}
                className="send-button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;