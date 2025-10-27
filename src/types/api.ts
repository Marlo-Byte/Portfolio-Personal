// Tipos para la API y chat

export interface ChatMessage {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: Date
}

export interface GeminiResponse {
  response: string
  timestamp: string
  sessionId: string
}

export interface GeminiError {
  error: string
  fallbackResponse?: string
}
