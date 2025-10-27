// Constantes de la aplicación

export const APP_CONFIG = {
  name: 'Portfolio Personal',
  version: '1.0.0',
  author: 'Mariano López',
  email: 'marianolopgarcia@gmail.com',
  github: 'https://github.com/Marlo-Byte',
  linkedin: 'https://linkedin.com/in/mariano-lopez',
  location: 'Salta Capital, Argentina',
  description: 'Portfolio personal con chat IA integrado usando Vue.js y Google Gemini'
} as const

export const NAVIGATION_ITEMS = [
  { name: 'Inicio', href: '#inicio', icon: 'home' },
  { name: 'Sobre mí', href: '#sobre-mi', icon: 'user' },
  { name: 'Habilidades', href: '#habilidades', icon: 'code' },
  { name: 'Proyectos', href: '#proyectos', icon: 'briefcase' },
  { name: 'Contacto', href: '#contacto', icon: 'mail' }
] as const

export const SOCIAL_LINKS = {
  github: 'https://github.com/Marlo-Byte',
  linkedin: 'https://linkedin.com/in/mariano-lopez',
  email: 'mailto:marianolopgarcia@gmail.com'
} as const

export const CHAT_CONFIG = {
  maxConversationHistory: 10,
  conversationTimeout: 30 * 60 * 1000, // 30 minutos
  typingDelay: 1000, // 1 segundo
  maxMessageLength: 1000
} as const
