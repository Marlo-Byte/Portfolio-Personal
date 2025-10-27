// Configuración de variables de entorno

export const ENV_CONFIG = {
  // API de Gemini
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  GEMINI_API_URL: import.meta.env.VITE_CHAT_API_URL || 'https://generativelanguage.googleapis.com/v1beta',

  // EmailJS (si se usa)
  EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',

  // Configuración de desarrollo
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL || '/'
} as const

// Validar variables de entorno requeridas
export const validateEnv = (): void => {
  if (!ENV_CONFIG.GEMINI_API_KEY || ENV_CONFIG.GEMINI_API_KEY === 'tu_api_key_aqui') {
    console.warn('⚠️ VITE_GEMINI_API_KEY no está configurada. El chat no funcionará.')
  }
}
