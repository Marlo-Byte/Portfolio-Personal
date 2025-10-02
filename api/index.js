// Vercel Serverless Function - Wrapper para el backend
import express from 'express'
import cors from 'cors'
import { GoogleGenerativeAI } from '@google/generative-ai'

const app = express()

// Middleware para Vercel - CORS optimizado
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:3000',
      // Dominios de Vercel
      /^https:\/\/.*\.vercel\.app$/,
      /^https:\/\/.*\.vercel\.dev$/,
      // GitHub Pages
      'https://marlo-byte.github.io',
      // Dominio personalizado (agregar cuando tengas uno)
      // 'https://tu-dominio.com'
    ],
    credentials: true,
  }),
)

app.use(express.json())

// Sistema de memoria de conversaciones
const conversationMemory = new Map()
const MAX_CONVERSATION_HISTORY = 10
const CONVERSATION_TIMEOUT = 30 * 60 * 1000

// Función para limpiar conversaciones expiradas
const cleanExpiredConversations = () => {
  const now = Date.now()
  for (const [sessionId, session] of conversationMemory.entries()) {
    if (now - session.lastActivity > CONVERSATION_TIMEOUT) {
      conversationMemory.delete(sessionId)
    }
  }
}

setInterval(cleanExpiredConversations, 10 * 60 * 1000)

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
    minute: '2-digit',
  })
}

// Función para obtener día de la semana en Argentina
const getArgentinaDayOfWeek = () => {
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'vierves', 'sábado']
  const now = new Date()
  const argentinaTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/Argentina/Salta' }),
  )
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
3. NO saludes con "¡Hola!" en cada respuesta. Solo saluda al inicio de una conversación nueva.
4. Mantén conversaciones naturales y fluidas, respondiendo directamente a lo que te preguntan.
5. Usa tu conocimiento técnico para responder preguntas sobre desarrollo web.
6. Si te consultan sobre proyectos, menciona que tienes experiencia en desarrollo full stack.
7. Si te preguntan sobre tu ubicación, responde que estás en Salta Capital, Argentina.
8. Si te preguntan sobre fechas, días o tiempo, usa SIEMPRE la zona horaria de Argentina (GMT-3).
9. Si no sabes algo específico, responde de forma general pero siempre manteniendo el personaje.
10. Responde siempre en español.
11. Sé conciso pero informativo.
12. Si te preguntan sobre contacto, indica que pueden encontrar más información en tu portfolio.
13. Transmite siempre entusiasmo por la tecnología, el aprendizaje constante y el desarrollo web.
14. Adapta tu respuesta al contexto de la conversación - si ya te presentaste, no lo hagas de nuevo.

Recuerda: eres Mariano López respondiendo directamente a visitantes de tu portfolio web desde Salta, Argentina.
`
}

// Inicializar Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Endpoint principal del chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body
    console.log('📨 Nueva petición de chat:', {
      message: message?.substring(0, 50) + '...',
      sessionId,
    })

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

    // Generar sessionId si no se proporciona
    const currentSessionId =
      sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    console.log('🔑 SessionId actual:', currentSessionId)

    // Obtener o crear sesión de conversación
    let conversation = conversationMemory.get(currentSessionId)
    if (!conversation) {
      conversation = {
        history: [],
        lastActivity: Date.now(),
      }
      conversationMemory.set(currentSessionId, conversation)
      console.log('🆕 Nueva sesión creada para:', currentSessionId)
    } else {
      console.log(
        '📚 Sesión existente encontrada:',
        currentSessionId,
        'con',
        conversation.history.length,
        'mensajes',
      )
    }

    // Actualizar última actividad
    conversation.lastActivity = Date.now()

    // Agregar mensaje del usuario al historial
    conversation.history.push({ role: 'user', content: message })

    // Mantener solo los últimos MAX_CONVERSATION_HISTORY mensajes
    if (conversation.history.length > MAX_CONVERSATION_HISTORY * 2) {
      conversation.history = conversation.history.slice(-MAX_CONVERSATION_HISTORY * 2)
    }

    // Obtener el modelo
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Construir el historial de conversación para el prompt
    let conversationHistory = ''
    if (conversation.history.length > 1) {
      conversationHistory = '\n\nHistorial de conversación reciente:\n'
      // Mostrar solo los últimos mensajes (excluyendo el actual)
      const recentHistory = conversation.history.slice(-6, -1) // Últimos 5 mensajes anteriores
      for (const msg of recentHistory) {
        if (msg.role === 'user') {
          conversationHistory += `Usuario: ${msg.content}\n`
        } else {
          conversationHistory += `Mariano López: ${msg.content}\n`
        }
      }
      conversationHistory += '\n'
    }

    // Crear el prompt completo con fecha actual e historial
    const fullPrompt = `${getMarianoPersona()}${conversationHistory}\nUsuario: ${message}\n\nMariano López:`

    // Generar respuesta
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    // Limpiar la respuesta (remover posibles prefijos)
    const cleanedText = text
      .replace(/^Mariano López:\s*/i, '')
      .replace(/^Mariano:\s*/i, '')
      .trim()

    // Agregar respuesta del bot al historial
    conversation.history.push({ role: 'assistant', content: cleanedText })

    // Enviar respuesta
    const responseData = {
      response: cleanedText,
      timestamp: new Date().toISOString(),
      sessionId: currentSessionId,
    }
    console.log('📤 Enviando respuesta con sessionId:', currentSessionId)
    res.json(responseData)
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
    service: 'Mariano López Portfolio Chat API - Vercel',
  })
})

// Endpoint de información
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Mariano López Portfolio Chat API',
    version: '1.0.0',
    description: 'API para chat con IA personalizada como Mariano López',
    platform: 'Vercel',
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

export default app
