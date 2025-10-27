import { ref } from 'vue'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ENV_CONFIG, CHAT_CONFIG } from '@/config'

interface Message {
  id: string
  content: string
  type: 'user' | 'bot'
  time: string
}

interface ChatSession {
  history: Array<{ role: 'user' | 'assistant'; content: string }>
  lastActivity: number
}

// Sistema de memoria de conversaciones
const conversationMemory = new Map<string, ChatSession>()
const MAX_CONVERSATION_HISTORY = CHAT_CONFIG.maxConversationHistory
const CONVERSATION_TIMEOUT = CHAT_CONFIG.conversationTimeout

// Función para limpiar conversaciones expiradas
const cleanExpiredConversations = () => {
  const now = Date.now()
  for (const [sessionId, session] of conversationMemory.entries()) {
    if (now - session.lastActivity > CONVERSATION_TIMEOUT) {
      conversationMemory.delete(sessionId)
    }
  }
}

// Limpiar conversaciones cada 10 minutos
setInterval(cleanExpiredConversations, 10 * 60 * 1000)

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
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
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

export function useGeminiChat() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Inicializar Gemini AI
  const initializeGemini = () => {
    if (!ENV_CONFIG.GEMINI_API_KEY || ENV_CONFIG.GEMINI_API_KEY === 'tu_api_key_aqui') {
      throw new Error('API key de Gemini no configurada. Por favor, configura VITE_GEMINI_API_KEY en tu archivo .env')
    }

    return new GoogleGenerativeAI(ENV_CONFIG.GEMINI_API_KEY)
  }

  // Enviar mensaje al chat
  const sendMessage = async (message: string, sessionId: string): Promise<string> => {
    try {
      isLoading.value = true
      error.value = null

      const genAI = initializeGemini()
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

      // Obtener o crear sesión de conversación
      let conversation = conversationMemory.get(sessionId)
      if (!conversation) {
        conversation = {
          history: [],
          lastActivity: Date.now(),
        }
        conversationMemory.set(sessionId, conversation)
      }

      // Actualizar última actividad
      conversation.lastActivity = Date.now()

      // Agregar mensaje del usuario al historial
      conversation.history.push({ role: 'user', content: message })

      // Mantener solo los últimos MAX_CONVERSATION_HISTORY mensajes
      if (conversation.history.length > MAX_CONVERSATION_HISTORY * 2) {
        conversation.history = conversation.history.slice(-MAX_CONVERSATION_HISTORY * 2)
      }

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

      return cleanedText
    } catch (err) {
      console.error('Error en chat:', err)

      if (err instanceof Error) {
        if (err.message.includes('API key')) {
          error.value = 'API key de Gemini no configurada. Por favor, configura VITE_GEMINI_API_KEY en tu archivo .env'
        } else if (err.message.includes('quota')) {
          error.value = 'Se ha excedido el límite de uso de la API. Inténtalo más tarde.'
        } else {
          error.value = 'Error al conectar con Gemini: ' + err.message
        }
      } else {
        error.value = 'Error desconocido al procesar el mensaje'
      }

      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Limpiar sesión
  const clearSession = (sessionId: string) => {
    conversationMemory.delete(sessionId)
  }

  // Obtener respuestas de fallback
  const getFallbackResponse = (): string => {
    const fallbackResponses = [
      'Disculpa, estoy teniendo problemas técnicos en este momento. ¿Podrías intentar de nuevo en unos minutos?',
      'Lo siento, hay un problema con mi conexión. Mientras tanto, puedes explorar mi portfolio para conocer más sobre mi trabajo.',
      'Parece que hay un inconveniente técnico. Te invito a revisar mis proyectos y experiencia en el portfolio.',
    ]
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  }

  return {
    isLoading,
    error,
    sendMessage,
    clearSession,
    getFallbackResponse,
  }
}
