// Tipos principales del portfolio

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

export interface Skill {
  name: string
  icon?: string
  iconClass?: string
  featured?: boolean
}

export interface SkillCategory {
  name: string
  description: string
  skills: Skill[]
}

export interface Certificate {
  id: string
  title: string
  institution: string
  date: string
  description: string
  pdfUrl: string
  imageUrl?: string
}

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

// Tipos para el tema
export type Theme = 'light' | 'dark'

// Tipos para las secciones de navegación
export interface NavItem {
  name: string
  href: string
  icon?: string
}
