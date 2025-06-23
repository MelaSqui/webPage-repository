const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fetch = require("node-fetch"); // <--- Línea eliminada


const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "squi#1234",
  database: "webpage",
  port: "3306",
};

const dbConnection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
dbConnection.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
    return;
  }
  console.log("✅ Conexión a la base de datos MySQL establecida");
});

// Endpoint: guardar contacto (por ejemplo desde formulario)
app.post("/api/registro", (req, res) => {
  const { nombre, email, pais, telefono, mensaje } = req.body;
  console.log("📩 Datos recibidos en /api/registro:", req.body);

  if (!nombre || !email || !pais || !telefono) {
    return res.status(400).json({ error: "Nombre, email, país y teléfono son obligatorios." });
  }

  const query = "INSERT INTO contactos (nombre, email, pais, telefono, mensaje) VALUES (?, ?, ?, ?, ?)";
  dbConnection.query(query, [nombre, email, pais, telefono, mensaje], (error, results) => {
    if (error) {
      console.error("❌ Error al insertar datos en la tabla:", error);
      return res.status(500).json({ error: "Error al guardar los datos." });
    }

    res.status(201).json({
      message: "✅ Datos guardados correctamente.",
      id: results.insertId,
    });
  });
});

// Endpoint duplicado: puedes mantener solo uno si lo deseas
app.post("/api/save", (req, res) => {
  const { nombre, email, pais, telefono, mensaje } = req.body;
  console.log("📩 Datos recibidos en /api/save:", req.body);

  if (!nombre || !email || !pais || !telefono) {
    return res.status(400).json({ error: "Nombre, email, pais y telefono son obligatorios." });
  }

  const query = "INSERT INTO contactos (nombre, email, pais, telefono, mensaje) VALUES (?, ?, ?, ?, ?)";
  dbConnection.query(query, [nombre, email, pais, telefono, mensaje], (error, results) => {
    if (error) {
      console.error("❌ Error al insertar datos en la tabla:", error);
      return res.status(500).json({ error: "Error al guardar los datos." });
    }

    res.status(201).json({
      message: "✅ Datos guardados correctamente.",
      id: results.insertId,
    });
  });
});

// Obtener todos los productos
// (Aquí puedes agregar endpoints si lo necesitas)

// Endpoint para el chatbot con Ollama llama3
app.post("/api/chatbot", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt es requerido." });
  }

  // Contexto enriquecido mejorado
  const contexto = `
Eres el Asistente Virtual de Veterinaria Vida Animal. Tu propósito es brindar información clara, profesional y amigable sobre nuestros servicios veterinarios, precios, horarios y cuidados para mascotas.

📍 Información clave:
- Nombre: Veterinaria Vida Animal
- Dirección: [Dirección completa o zona de cobertura]
- Contacto: [Teléfono/WhatsApp/correo]
- Redes: [@VidaAnimal en redes sociales]

🛠 Servicios detallados:
1. CONSULTA VETERINARIA (Bs. 80):
   - Diagnóstico y tratamiento completo
   - Emergencias 24/7 con cita previa (+Bs. 40)

2. VACUNACIÓN (Bs. 50 c/u):
   - Paquete completo (3 dosis): Bs. 120
   - Incluye: Antirrábica, Pentavalente, etc.

3. PELUQUERÍA:
   - Baño: Bs. 40 | Corte: Bs. 35
   - Paquete completo: Bs. 65

4. GUARDERÍA (Bs. 60/día):
   - Con supervisión veterinaria
   - Descuento semanal: Bs. 300

5. ENTRENAMIENTO (Bs. 100/sesión):
   - Paquete de 5 sesiones: Bs. 450

6. TIENDA:
   - Alimentos premium, accesorios y medicamentos
   - Promoción: 10% descuento en compras >Bs. 200

⏰ Horarios:
- Lunes-Viernes: 8:00AM - 7:00PM
- Sábados: 9:00AM - 2:00PM
- Domingos: Cerrado (solo emergencias)

📢 Promociones:
- 1ra consulta con 10% descuento
- Pack "Mascota Sana" (consulta+vacuna+baño): Bs. 150
- Programa de fidelización: 5 visitas = 1 baño gratis

🐶 Tips rápidos (si preguntan):
- "Desparasitar cada 3-4 meses"
- "Vacunas obligatorias: antirrábica y polivalente"
- "Castraciones desde Bs. 200 (incluye postoperatorio)"

🚫 Políticas:
- Cancelaciones: 24h de anticipación
- Pagos: Efectivo/tarjeta (+3% comisión)
- Animales atendidos: Perros, gatos y pequeños

Acerca de nosotros:
Somos especialistas en salud animal con 10 años de experiencia, comprometidos con el bienestar de tus mascotas y la tenencia responsable.

Responde siempre en español, con tono amable pero profesional. Usa emojis moderados (🐾,❤️) y ofrece ayuda concreta.

Si la pregunta no está relacionada con veterinaria o mascotas, responde:
"Lo siento, solo puedo ayudarte con información sobre servicios veterinarios, precios, horarios o cuidados de mascotas. ¿En qué más necesitas ayuda?"`;

  // Combina el contexto con el prompt del usuario
  const promptConContexto = `${contexto}\n\nUsuario: ${prompt}\nAsistente:`;

  try {
    const ollamaRes = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma3",
        prompt: promptConContexto,
        stream: false,
      }),
    });

    const data = await ollamaRes.json();
    res.json({ response: data.response });
  } catch (error) {
    console.error("❌ Error comunicando con Ollama:", error);
    res.status(500).json({ error: "Error comunicando con Ollama." });
  }
});

// Endpoints base
app.get("/", (req, res) => {
  res.send("¡Hola desde mi backend con Express!");
});

app.get("/servicio", (req, res) => {
  res.send("¡Hola desde mi backend con Express! Servicio");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});