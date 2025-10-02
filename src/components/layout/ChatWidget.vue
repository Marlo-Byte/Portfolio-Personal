<template>
  <div class="chat-widget">
    <!-- Botón flotante del chat -->
    <transition name="bounce">
      <button v-if="!isOpen" @click="toggleChat" class="chat-toggle-btn" :class="{ dark: isDark }">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
            fill="currentColor"
          />
          <circle cx="7" cy="9" r="1" fill="currentColor" />
          <circle cx="12" cy="9" r="1" fill="currentColor" />
          <circle cx="17" cy="9" r="1" fill="currentColor" />
        </svg>
        <span class="chat-badge" v-if="hasNewMessage">1</span>
      </button>
    </transition>

    <!-- Ventana del chat -->
    <transition name="slide-up">
      <div v-if="isOpen" class="chat-window" :class="{ dark: isDark }">
        <!-- Header del chat -->
        <div class="chat-header">
          <div class="chat-avatar">
            <img src="/images/yo_animado.jpg" alt="Mariano López" />
          </div>
          <div class="chat-info">
            <h4>Mariano López</h4>
            <span class="status">{{ isTyping ? 'Escribiendo...' : 'En línea' }}</span>
          </div>
          <div class="chat-actions">
            <button @click="clearSession" class="clear-btn" title="Nueva conversación">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6H21M8 6V4C8 3.45 8.45 3 9 3H15C15.55 3 16 3.45 16 4V6M19 6V20C19 20.55 18.55 21 18 21H6C5.45 21 5 20.55 5 20V6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button @click="toggleChat" class="close-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Área de mensajes -->
        <div class="chat-messages" ref="messagesContainer">
          <div class="welcome-message" v-if="messages.length === 0">
            <div class="message bot-message">
              <div class="message-content">
                ¡Hola! 👋 Soy Mariano López. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre mi
                experiencia, proyectos o cualquier cosa relacionada con mi perfil profesional.
              </div>
              <div class="message-time">{{ getCurrentTime() }}</div>
            </div>
          </div>

          <div
            v-for="message in messages"
            :key="message.id"
            class="message"
            :class="message.type + '-message'"
          >
            <div class="message-content">
              {{ message.content }}
            </div>
            <div class="message-time">{{ message.time }}</div>
          </div>

          <!-- Indicador de escritura -->
          <div v-if="isTyping" class="message bot-message typing">
            <div class="message-content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input del chat -->
        <div class="chat-input">
          <div class="input-container">
            <input
              v-model="currentMessage"
              @keypress.enter="sendMessage"
              @input="handleInput"
              @focus="scrollToBottom"
              placeholder="Escribe tu mensaje..."
              :disabled="isLoading"
              class="message-input"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="sentences"
              spellcheck="true"
            />
            <button
              @click="sendMessage"
              :disabled="!currentMessage.trim() || isLoading"
              class="send-btn"
            >
              <svg v-if="!isLoading" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M18 2L9 11L4 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 2L12 18L9 11L2 8L18 2Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div v-else class="loading-spinner"></div>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed, watch } from 'vue'

interface Message {
  id: string
  content: string
  type: 'user' | 'bot'
  time: string
}

// Props
const props = defineProps<{
  isDark?: boolean
}>()

// Estado del chat
const isOpen = ref(false)
const currentMessage = ref('')
const messages = ref<Message[]>([])
const isLoading = ref(false)
const isTyping = ref(false)
const hasNewMessage = ref(false)
const messagesContainer = ref<HTMLElement>()
const sessionId = ref<string>('')

// Computed
const isDark = computed(() => props.isDark || false)

// Métodos
const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    hasNewMessage.value = false
    nextTick(() => {
      scrollToBottom()
    })
  }
}

// Función para limpiar la sesión (opcional, para empezar conversación nueva)
const clearSession = () => {
  sessionId.value = ''
  messages.value = []
}

const getCurrentTime = () => {
  return new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const sendMessage = async () => {
  console.log('📝 sendMessage llamado con:', currentMessage.value)
  if (!currentMessage.value.trim() || isLoading.value) return

  const userMessage: Message = {
    id: Date.now().toString(),
    content: currentMessage.value,
    type: 'user',
    time: getCurrentTime(),
  }

  messages.value.push(userMessage)
  const messageToSend = currentMessage.value
  currentMessage.value = ''

  await nextTick()
  scrollToBottom()

  // Simular respuesta de IA (aquí se conectará con Gemini)
  await simulateAIResponse(messageToSend)
}

const simulateAIResponse = async (userMessage: string) => {
  isLoading.value = true
  isTyping.value = true

  try {
    // Llamada real a la API de Gemini a través del backend
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
    console.log('🚀 Enviando mensaje:', { userMessage, sessionId: sessionId.value, apiUrl })
    const response = await fetch(`${apiUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        sessionId: sessionId.value || undefined,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('📨 Respuesta recibida:', data)

    // Actualizar sessionId si se recibe del backend
    if (data.sessionId) {
      sessionId.value = data.sessionId
      console.log('🔑 SessionId actualizado:', sessionId.value)
    }

    let botResponse = ''
    if (data.response) {
      botResponse = data.response
    } else if (data.fallbackResponse) {
      botResponse = data.fallbackResponse
    } else {
      throw new Error('No response received')
    }

    const botMessage: Message = {
      id: Date.now().toString(),
      content: botResponse,
      type: 'bot',
      time: getCurrentTime(),
    }

    messages.value.push(botMessage)

    if (!isOpen.value) {
      hasNewMessage.value = true
    }

    await nextTick()
    scrollToBottom()
  } catch (error) {
    console.error('Error al enviar mensaje:', error)

    let errorContent =
      'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.'

    // Mensajes de error más específicos
    if (error instanceof TypeError && error.message.includes('fetch')) {
      errorContent =
        'No puedo conectarme con el servidor en este momento. Asegúrate de que el servidor backend esté ejecutándose.'
    } else if (error instanceof Error && error.message.includes('HTTP error')) {
      errorContent =
        'Hay un problema con el servidor. Por favor, inténtalo de nuevo en unos minutos.'
    }

    const errorMessage: Message = {
      id: Date.now().toString(),
      content: errorContent,
      type: 'bot',
      time: getCurrentTime(),
    }
    messages.value.push(errorMessage)
  } finally {
    isLoading.value = false
    isTyping.value = false
  }
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    // Usar requestAnimationFrame para mejor rendimiento en móviles
    requestAnimationFrame(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        // Fallback para dispositivos que no soportan smooth scroll
        messagesContainer.value.scrollTo({
          top: messagesContainer.value.scrollHeight,
          behavior: 'smooth',
        })
      }
    })
  }
}

const handleInput = () => {
  // Aquí se puede agregar lógica para mostrar "escribiendo" al usuario
  // En móviles, asegurar que el input esté visible cuando aparece el teclado
  if (window.innerWidth <= 768) {
    setTimeout(() => {
      scrollToBottom()
    }, 300) // Delay para esperar a que aparezca el teclado
  }
}

// Función para cargar sessionId desde localStorage
const loadSessionId = () => {
  const savedSessionId = localStorage.getItem('chat-session-id')
  if (savedSessionId) {
    sessionId.value = savedSessionId
    console.log('💾 SessionId cargado desde localStorage:', savedSessionId)
  } else {
    console.log('💾 No hay sessionId en localStorage')
  }
}

// Función para guardar sessionId en localStorage
const saveSessionId = (id: string) => {
  localStorage.setItem('chat-session-id', id)
}

// Manejar cambios de orientación en móviles
const handleResize = () => {
  if (isOpen.value && window.innerWidth <= 768) {
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  }
}

// Lifecycle
onMounted(() => {
  console.log('🎯 ChatWidget montado correctamente')
  loadSessionId()

  window.addEventListener('resize', handleResize)
  window.addEventListener('orientationchange', handleResize)
})

// Cleanup en unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('orientationchange', handleResize)
})

// Watcher para guardar sessionId cuando cambie
watch(sessionId, (newSessionId) => {
  if (newSessionId) {
    saveSessionId(newSessionId)
  }
})
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Botón flotante */
.chat-toggle-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  position: relative;
}

.chat-toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
}

.chat-toggle-btn.dark {
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  box-shadow: 0 4px 20px rgba(74, 85, 104, 0.4);
}

.chat-toggle-btn.dark:hover {
  box-shadow: 0 6px 25px rgba(74, 85, 104, 0.6);
}

.chat-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e53e3e;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

/* Ventana del chat */
.chat-window {
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  bottom: 80px;
  right: 0;
}

.chat-window.dark {
  background: #2d3748;
  color: white;
}

/* Header del chat */
.chat-header {
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-window.dark .chat-header {
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
}

.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.chat-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chat-info {
  flex: 1;
}

.chat-info h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.status {
  font-size: 12px;
  opacity: 0.8;
}

.chat-actions {
  display: flex;
  gap: 8px;
}

.clear-btn,
.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-btn:hover,
.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.clear-btn:active,
.close-btn:active {
  background: rgba(255, 255, 255, 0.2);
}

/* Área de mensajes */
.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling en iOS */
  scroll-behavior: smooth;
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 80%;
}

.user-message {
  align-self: flex-end;
}

.bot-message {
  align-self: flex-start;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
}

.user-message .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.bot-message .message-content {
  background: #f7fafc;
  color: #2d3748;
}

.chat-window.dark .bot-message .message-content {
  background: #4a5568;
  color: white;
}

.message-time {
  font-size: 11px;
  opacity: 0.6;
  margin-top: 4px;
  padding: 0 4px;
}

.user-message .message-time {
  text-align: right;
}

/* Indicador de escritura */
.typing .message-content {
  padding: 16px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #cbd5e0;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}
.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Input del chat */
.chat-input {
  padding: 16px;
  border-top: 1px solid #e2e8f0;
}

.chat-window.dark .chat-input {
  border-top-color: #4a5568;
}

.input-container {
  display: flex;
  gap: 8px;
  align-items: center;
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s;
}

.message-input:focus {
  border-color: #667eea;
}

.chat-window.dark .message-input {
  background: #4a5568;
  border-color: #4a5568;
  color: white;
}

.chat-window.dark .message-input::placeholder {
  color: #a0aec0;
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Transiciones */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.slide-up-enter-active {
  animation: slide-up 0.3s ease-out;
}

.slide-up-leave-active {
  animation: slide-up 0.3s ease-in reverse;
}

@keyframes slide-up {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .chat-widget {
    bottom: 10px;
    right: 10px;
    left: 10px;
  }

  .chat-window {
    width: calc(100vw - 20px);
    height: calc(100vh - 120px);
    bottom: 70px;
    right: 0;
    left: 0;
    margin: 0 auto;
    border-radius: 12px;
    max-height: 600px;
  }

  .chat-toggle-btn {
    width: 56px;
    height: 56px;
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  .chat-header {
    padding: 12px 16px;
  }

  .chat-avatar {
    width: 36px;
    height: 36px;
  }

  .chat-info h4 {
    font-size: 15px;
  }

  .status {
    font-size: 11px;
  }

  .chat-messages {
    padding: 12px;
    gap: 10px;
  }

  .message {
    max-width: 85%;
  }

  .message-content {
    padding: 10px 14px;
    font-size: 14px;
    border-radius: 16px;
  }

  .chat-input {
    padding: 12px;
  }

  .message-input {
    padding: 10px 14px;
    font-size: 16px; /* Evita zoom en iOS */
    border-radius: 20px;
  }

  .send-btn {
    width: 36px;
    height: 36px;
    min-width: 36px;
  }
}

@media (max-width: 480px) {
  .chat-widget {
    bottom: 8px;
    right: 8px;
    left: 8px;
  }

  .chat-window {
    width: calc(100vw - 16px);
    height: calc(100vh - 100px);
    bottom: 64px;
    border-radius: 8px;
    max-height: none;
  }

  .chat-toggle-btn {
    width: 52px;
    height: 52px;
    bottom: 16px;
    right: 16px;
  }

  .chat-header {
    padding: 10px 12px;
  }

  .chat-avatar {
    width: 32px;
    height: 32px;
  }

  .chat-info h4 {
    font-size: 14px;
  }

  .status {
    font-size: 10px;
  }

  .chat-messages {
    padding: 10px;
    gap: 8px;
  }

  .message {
    max-width: 90%;
  }

  .message-content {
    padding: 8px 12px;
    font-size: 13px;
    border-radius: 14px;
  }

  .message-time {
    font-size: 10px;
  }

  .chat-input {
    padding: 10px;
  }

  .message-input {
    padding: 8px 12px;
    font-size: 16px;
    border-radius: 18px;
  }

  .send-btn {
    width: 32px;
    height: 32px;
    min-width: 32px;
  }

  .clear-btn,
  .close-btn {
    padding: 6px;
  }

  .clear-btn svg,
  .close-btn svg {
    width: 16px;
    height: 16px;
  }
}

/* Mejoras adicionales para touch devices */
@media (hover: none) and (pointer: coarse) {
  .chat-toggle-btn {
    width: 56px;
    height: 56px;
  }

  .send-btn,
  .clear-btn,
  .close-btn {
    min-height: 44px;
    min-width: 44px;
  }

  .message-input {
    font-size: 16px; /* Previene zoom automático en iOS */
  }
}

/* Landscape orientation en móviles */
@media (max-width: 768px) and (orientation: landscape) {
  .chat-window {
    height: calc(100vh - 80px);
    max-height: 400px;
  }

  .chat-messages {
    padding: 8px;
  }

  .chat-header {
    padding: 8px 12px;
  }

  .chat-input {
    padding: 8px;
  }
}
</style>
