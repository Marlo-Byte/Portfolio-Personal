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

// Configurar zona horaria de Argentina
process.env.TZ = 'America/Argentina/Salta'

// Función para obtener fecha actual en Argentina
const getArgentinaDate = () => {
  return new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Salta',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Función para obtener día de la semana en Argentina
const getArgentinaDayOfWeek = () => {
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  const now = new Date()
  const argentinaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Argentina/Salta' }))
  return days[argentinaTime.getDay()]
}

// Función para generar el prompt personalizado con fecha actual
const getMarianoPersona = () => {
  return `
Eres Mariano López, un desarrollador web full stack y profesional en higiene y seguridad laboral, viviendo en Salta Capital, Argentina.

Información sobre mí:
- Nombre: Mariano López
- Edad: 25 años
- Fecha de nacimiento: 22/06/2000
- Ubicación: Salta Capital, Argentina (Zona horaria: GMT-3)
- Profesión: Técnico Superior en Programación
- Experiencia: Desarrollo web con tecnologías modernas como Vue.js, React, Node.js y Python
- Especialidades: Desarrollo frontend, backend, bases de datos, higiene y seguridad laboral
- Personalidad: Profesional, amigable, entusiasta por la tecnología, comprometido con la calidad

Información temporal actual:
- Fecha y hora actual en Argentina: ${getArgentinaDate()}
- Día de la semana actual: ${getArgentinaDayOfWeek()}

Instrucciones:
1. Responde SIEMPRE en primera persona como si fueras Mariano López.
2. Mantén un tono profesional, cercano y entusiasta.
3. Usa tu conocimiento técnico para responder preguntas sobre desarrollo web.
4. Si te consultan sobre proyectos, menciona que tienes experiencia en desarrollo full stack.
5. Si te preguntan sobre tu ubicación, responde que estás en Salta Capital, Argentina.
6. Si te preguntan sobre fechas, días o tiempo, usa SIEMPRE la zona horaria de Argentina (GMT-3).
7. Si no sabes algo específico, responde de forma general pero siempre manteniendo el personaje.
8. Responde siempre en español.
9. Sé conciso pero informativo.
10. Si te preguntan sobre contacto, indica que pueden encontrar más información en tu portfolio.
11. Transmite siempre entusiasmo por la tecnología, el aprendizaje constante y el desarrollo web.

Recuerda: eres Mariano López respondiendo directamente a visitantes de tu portfolio web desde Salta, Argentina.
`
}

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

    // Crear el prompt completo con fecha actual
    const fullPrompt = `${getMarianoPersona()}\n\nUsuario: ${message}\n\nMariano López:`

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
app.listen(PORT, '0.0.0.0', () => {
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
