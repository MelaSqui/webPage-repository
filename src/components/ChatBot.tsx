import React, { useState, useEffect } from 'react';
import './ChatBot.css';

type Message = {
  text: string;
  from: 'user' | 'bot';
};

const getBotResponse = (input: string): string => {
  const msg = input.trim().toLowerCase();

  // Preguntas clave sobre el cuidado de mascotas
  if (
    msg.includes('¿cómo cuido a mi perro?') ||
    msg.includes('como cuido a mi perro')
  ) {
    return 'Para cuidar a tu perro, proporciónale una dieta equilibrada, ejercicio diario, agua fresca, visitas regulares al veterinario y mucho cariño. ¿Te gustaría saber sobre vacunas, alimentación o entrenamiento?';
  }
  if (
    msg.includes('¿cada cuánto debo bañar a mi gato?') ||
    msg.includes('cada cuanto debo bañar a mi gato')
  ) {
    return 'Los gatos suelen asearse solos, pero si es necesario, puedes bañarlo cada 2-3 meses con productos especiales para gatos. ¿Quieres consejos para bañar a tu gato sin estrés?';
  }
  if (
    msg.includes('¿qué vacunas necesita mi mascota?') ||
    msg.includes('que vacunas necesita mi mascota')
  ) {
    return 'Las vacunas esenciales para perros y gatos incluyen la antirrábica y las vacunas contra enfermedades virales. ¿Te gustaría conocer el calendario de vacunación recomendado?';
  }
  if (
    msg.includes('¿qué alimento es mejor para mi mascota?') ||
    msg.includes('que alimento es mejor para mi mascota')
  ) {
    return 'El mejor alimento depende de la especie, edad y estado de salud de tu mascota. Consulta con tu veterinario para una recomendación personalizada. ¿Quieres saber sobre alimentos comerciales o naturales?';
  }
  if (
    msg.includes('¿cómo entreno a mi perro?') ||
    msg.includes('como entreno a mi perro')
  ) {
    return 'El entrenamiento debe ser positivo y consistente. Usa premios, refuerzos y sesiones cortas. ¿Te gustaría algunos consejos básicos de obediencia?';
  }
  if (
    msg.includes('¿cómo evito que mi gato arañe los muebles?') ||
    msg.includes('como evito que mi gato arañe los muebles')
  ) {
    return 'Proporciónale rascadores y juega con él para canalizar su energía. Usa repelentes seguros y refuerza el buen comportamiento. ¿Quieres más ideas para proteger tus muebles?';
  }
  // Saludo y despedida
  if (msg.includes('hola') || msg.includes('buenas')) {
    return '¡Hola! Soy una IA lista para ayudarte con el cuidado de tus mascotas 🐶🐱. Puedes preguntarme, por ejemplo: ¿Cómo cuido a mi perro? ¿Qué vacunas necesita mi mascota?';
  }
  if (msg.includes('adiós') || msg.includes('gracias')) {
    return '¡Hasta luego! Si tienes más preguntas sobre tus mascotas, aquí estaré para ayudarte.';
  }
  // Respuesta por defecto
  return 'Interesante pregunta. Como IA, intento ayudarte lo mejor posible, pero no entendí exactamente tu consulta. Puedes preguntarme, por ejemplo: ¿Cómo cuido a mi perro? ¿Qué alimento es mejor para mi mascota? ¿Cómo entreno a mi perro?';
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  // Saludo automático al iniciar el chat
  useEffect(() => {
    setMessages([
      {
        text:
          '¡Hola! Soy una IA lista para ayudarte con el cuidado de tus mascotas 🐶🐱. Puedes preguntarme, por ejemplo:\n' +
          '• ¿Cómo cuido a mi perro?\n' +
          '• ¿Qué vacunas necesita mi mascota?\n' +
          '• ¿Qué alimento es mejor para mi mascota?\n' +
          '• ¿Cómo entreno a mi perro?\n' +
          '• ¿Cómo evito que mi gato arañe los muebles?',
        from: 'bot'
      }
    ]);
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const userMsg: Message = { text: input, from: 'user' };
      const botMsg: Message = { text: getBotResponse(input), from: 'bot' };
      setMessages(prev => [...prev, userMsg, botMsg]);
      setInput('');
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">Chat IA de Mascotas</div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${msg.from === 'bot' ? 'bot' : 'user'}`}
            style={msg.from === 'bot' ? { whiteSpace: 'pre-line' } : {}}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBot;