const express = require('express')
const cors = require('cors')
const { GoogleGenerativeAI } = require('@google/generative-ai')
const path = require('path')

// Configurar dotenv solo para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
}

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:3000',
      'https://marlo-byte.github.io',
    ],
    credentials: true,
  }),
)
app.use(express.json())

// Inicializar Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Prompt personalizado para Mariano López
const MARIANO_PERSONA = `
Eres Mariano López, un desarrollador web y profesional en higiene y seguridad laboral de Salta, Argentina.

Información sobre ti:
- Nombre: Mariano López
- Ubicación: Salta Capital, Argentina
- Profesión: Desarrollador Web Full Stack y Técnico en Higiene y Seguridad Laboral
- Experiencia: Desarrollo web con tecnologías modernas como Vue.js, React, Node.js, Python
- Especialidades: Frontend development, backend development, bases de datos, higiene y seguridad laboral
- Personalidad: Profesional, amigable, entusiasta por la tecnología, comprometido con la calidad

Instrucciones:
1. Responde SIEMPRE en primera persona como si fueras Mariano López
2. Mantén un tono profesional pero cercano y amigable
3. Usa tu conocimiento técnico para responder preguntas sobre desarrollo web
4. Si te preguntan sobre proyectos, menciona que tienes experiencia en desarrollo full stack
5. Si te preguntan sobre tu ubicación, menciona que estás en Salta Capital, Argentina
6. Si no sabes algo específico sobre Mariano, responde de manera general pero mantén el personaje
7. Siempre responde en español
8. Mantén las respuestas concisas pero informativas
9. Si te preguntan sobre contacto, menciona que pueden ver más información en el portfolio
10. Muestra entusiasmo por la tecnología y el desarrollo web

Recuerda: Eres Mariano López respondiendo directamente a visitantes de tu portfolio web.
`

// Endpoint para chat con IA
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body

    if (!message || message.trim() === '') {
      return res.status(400).json({
        error: 'El mensaje no puede estar vacío',
      })
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'API key de Gemini no configurada',
      })
    }

    // Obtener el modelo
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Crear el prompt completo
    const fullPrompt = `${MARIANO_PERSONA}\n\nUsuario: ${message}\n\nMariano López:`

    // Generar respuesta
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    // Limpiar la respuesta (remover posibles prefijos)
    const cleanedText = text
      .replace(/^Mariano López:\s*/i, '')
      .replace(/^Mariano:\s*/i, '')
      .trim()

    res.json({
      response: cleanedText,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error en chat:', error)

    // Respuesta de fallback
    const fallbackResponses = [
      'Disculpa, estoy teniendo problemas técnicos en este momento. ¿Podrías intentar de nuevo en unos minutos?',
      'Lo siento, hay un problema con mi conexión. Mientras tanto, puedes explorar mi portfolio para conocer más sobre mi trabajo.',
      'Parece que hay un inconveniente técnico. Te invito a revisar mis proyectos y experiencia en el portfolio.',
    ]

    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

    res.status(500).json({
      error: 'Error interno del servidor',
      fallbackResponse: randomResponse,
    })
  }
})

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Mariano López Portfolio Chat API',
  })
})

// Endpoint de información
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Mariano López Portfolio Chat API',
    version: '1.0.0',
    description: 'API para chat con IA personalizada como Mariano López',
    endpoints: {
      chat: 'POST /api/chat',
      health: 'GET /api/health',
      info: 'GET /api/info',
    },
  })
})

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err)
  res.status(500).json({
    error: 'Error interno del servidor',
    message: 'Algo salió mal. Por favor, inténtalo de nuevo.',
  })
})

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: 'La ruta solicitada no existe en este servidor.',
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
  console.log(`📡 API disponible en http://localhost:${PORT}/api`)
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`)
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`)

  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  ADVERTENCIA: GEMINI_API_KEY no está configurada')
    console.warn('   Configura tu API key en el archivo .env')
  } else {
    console.log('✅ Gemini API key configurada correctamente')
  }
})

module.exports = app
