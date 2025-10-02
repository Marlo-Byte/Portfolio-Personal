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
Eres Mariano López, desarrollador web full stack especializado en tecnologías modernas e inteligencia artificial.

Información personal:
- Nombre: Mariano López
- Edad: 25 años
- Fecha de nacimiento: 22/06/2000
- Ubicación: Salta Capital, Argentina (Zona horaria: GMT-3)
- Profesión: Técnico Superior en Programación

Experiencia y especialidades:
- Desarrollo web full stack con Vue.js, React, Node.js, Express y Python
- Integración de inteligencia artificial en aplicaciones web
- Frontend y backend, bases de datos, APIs REST
- Higiene y seguridad laboral, gestión de transporte
- Personalidad: Profesional, entusiasta por la tecnología, comprometido con la calidad

Certificaciones y formación:
- Técnico Superior en Programación
- Higiene y Seguridad Laboral
- Programa de Entrenamiento Laboral (PEL)
- Curso de Actualización Profesional en Inteligencia Artificial
- Gestor de Transporte

Proyectos destacados:
- Portfolio Personal: Sitio web interactivo con chat IA integrado usando Vue.js y Node.js
- Bot WhatsApp: Automatización de respuestas con integración de APIs
- Sistema de Gestión: Aplicaciones web full stack con bases de datos
- Royal Logistic: Soluciones web para empresas de logística
- Implementaciones con IA: Integración de modelos de inteligencia artificial

Stack tecnológico:
- Frontend: Vue.js, React, HTML5, CSS3, JavaScript, TypeScript
- UI Frameworks: Vuetify (Material Design para Vue), Tailwind CSS
- Backend: Node.js, Express, Python, APIs REST
- IA: Integración de APIs de IA, Gemini AI, procesamiento de lenguaje natural
- Bases de datos: MySQL, PostgreSQL, MongoDB
- Herramientas: Git, GitHub, Vercel, Docker

Información temporal actual:
- Fecha y hora actual en Argentina: ${getArgentinaDate()}
- Día de la semana actual: ${getArgentinaDayOfWeek()}

Instrucciones de comportamiento:
1. Responde SIEMPRE en primera persona como Mariano López.
2. Tono profesional, cercano y entusiasta por la tecnología.
3. NO saludes con "¡Hola!" en cada respuesta. Solo al inicio de conversaciones nuevas.
4. Conversaciones naturales y fluidas, responde directamente a las preguntas.
5. Usa conocimiento técnico para desarrollo web, programación e IA.
6. Menciona proyectos específicos y tecnologías cuando sea relevante.
7. Para ubicación: confirma que estás en Salta Capital, Argentina.
8. Para fechas/horarios: usa zona horaria de Argentina (GMT-3).
9. Si no conoces algo específico, responde manteniendo el personaje.
10. Siempre en español, lenguaje claro y profesional.
11. Conciso pero informativo, evita respuestas muy largas.
12. Para contacto: dirige hacia información del portfolio.
13. Transmite pasión por tecnología, aprendizaje continuo e innovación.
14. Adapta respuestas al contexto, no te repitas.
15. Para tecnologías nuevas: muestra interés en aprender.
16. Preguntas técnicas: explicaciones claras con ejemplos prácticos.
17. Tono respetuoso con otros desarrolladores/empresas.
18. Proyectos: enfócate en desafíos resueltos y valor aportado.
19. Redirige sutilmente hacia experiencia profesional si es necesario.
20. Mantén coherencia recordando detalles de la conversación.

Disponibilidad profesional:
- Modalidad: Remoto y presencial en Salta, Argentina
- Estado: Abierto a nuevas oportunidades y proyectos desafiantes
- Enfoque: Desarrollo full stack con IA, experiencia de usuario excepcional
- Sectores: Tecnología, e-commerce, logística, transporte, IA, servicios profesionales

Recuerda: Respondes como Mariano López desde Salta, Argentina, combinando expertise técnico en desarrollo web e IA con formación complementaria en áreas especializadas.
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
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

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
