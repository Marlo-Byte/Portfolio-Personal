# 🚀 Portfolio Personal - Mariano López

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-181717?style=flat-square&logo=github)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **Portfolio profesional Full Stack** diseñado para destacar habilidades técnicas, proyectos y certificaciones. Incluye un asistente virtual integrado impulsado por IA (Google Gemini) que responde preguntas sobre mi perfil profesional en tiempo real.

---

## 🌟 Demo en Vivo

👉 **Visita el sitio web:** [https://marlo-byte.github.io/Portfolio-Personal/](https://marlo-byte.github.io/Portfolio-Personal/)

### ✨ Características Destacadas

- **🤖 Chatbot IA Avanzado**: Entrena con mi perfil profesional para responder consultas como un asistente virtual personalizado.
- **🎨 UI/UX Premium**: Diseño moderno con modo oscuro/claro, animaciones fluidas y tipografía cuidada.
- **📱 100% Responsive**: Experiencia optimizada para móviles, tablets y escritorio.
- **⚡ Alto Rendimiento**: Puntuaciones perfectas en Lighthouse gracias a Vite y Vue 3.
- **📄 Gestión de Documentos**: Visualización integrada de CV y certificaciones profesionales en PDF.

---

## 🛠️ Stack Tecnológico

Este proyecto ha sido construido utilizando las últimas tecnologías del ecosistema web moderno:

### Frontend Core

- **[Vue.js 3](https://vuejs.org/)**: Composition API y `<script setup>` para una arquitectura de componentes limpia y escalable.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático estricto para mayor robustez y mantenibilidad.
- **[Vite](https://vitejs.dev/)**: Entorno de desarrollo ultrarrápido y build optimizado.

### Integraciones y Servicios

- **🧠 Google Gemini AI**: Modelo de lenguaje `gemini-2.0-flash-exp` integrado directamente en el cliente para respuestas instantáneas.
- **📨 EmailJS**: Sistema de envío de correos seguro y sin backend para el formulario de contacto.
- **🌍 GitHub Pages**: Deployment automatizado y hosting estático de alto rendimiento.

### Herramientas y Calidad de Código

- **Estado**: [Pinia](https://pinia.vuejs.org/) (Sustituto moderno de Vuex).
- **Estilos**: CSS nativo con variables personalizadas (CSS Custom Properties) para el sistema de diseño.
- **Calidad**: ESLint (configuración propia) + Prettier + TypeScript Strict Mode.
- **Tests**: Vitest para pruebas unitarias.

---

## 📂 Estructura del Proyecto

La arquitectura del proyecto sigue principios de modularidad y separación de responsabilidades:

```bash
Portfolio-Personal/
├── public/                  # Assets estáticos (imágenes, PDFs, favicon)
│   ├── certificates/        # Certificados profesionales
│   └── images/              # Recursos gráficos del sitio
├── src/
│   ├── assets/              # Estilos globales y recursos compilables
│   │   └── css/             # Arquitectura CSS (base, main, variables)
│   ├── components/          # Librería de componentes Vue
│   │   ├── layout/          # Componentes estructurales (Navbar, Footer, Chat)
│   │   └── sections/        # Secciones de la Landing Page (Hero, About, etc.)
│   ├── composables/         # Lógica de negocio reutilizable (Hooks)
│   │   └── ai/              # Lógica de integración con Gemini AI
│   ├── config/              # Constantes y configuración de entorno
│   ├── types/               # Definiciones de tipos TypeScript globales
│   ├── utils/               # Funciones de utilidad puras
│   ├── App.vue              # Componente raíz
│   └── main.ts              # Punto de entrada de la aplicación
├── .env                     # Variables de entorno (no commitear)
├── package.json             # Dependencias y scripts
└── vite.config.ts           # Configuración de Vite
```

---

## 🚀 Instalación y Despliegue Local

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 1. Prerrequisitos

- Node.js (versión 20 o superior recomendada)
- npm (incluido con Node.js)

### 2. Clonar el repositorio

```bash
git clone https://github.com/Marlo-Byte/Portfolio-Personal.git
cd Portfolio-Personal
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basado en el siguiente ejemplo:

```env
# API Key para Google Gemini (Chatbot)
VITE_GEMINI_API_KEY=tu_api_key_aqui

# Credenciales para EmailJS (Formulario de contacto)
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

### 5. Ejecutar servidor de desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:5173`.

---

## ✅ Scripts Disponibles

| Comando              | Descripción                                                           |
| :------------------- | :-------------------------------------------------------------------- |
| `npm run dev`        | Inicia el servidor de desarrollo con Hot Module Replacement (HMR).    |
| `npm run build`      | Compila y optimiza el proyecto para producción en la carpeta `dist/`. |
| `npm run preview`    | Previsualiza localmente la versión compilada de producción.           |
| `npm run type-check` | Ejecuta la validación de tipos de TypeScript.                         |
| `npm run lint`       | Analiza y repara problemas de estilo de código con ESLint.            |
| `npm run format`     | Formatea todo el código del proyecto usando Prettier.                 |

---

## 🤖 Sobre el Chatbot IA

El asistente virtual ("Mariano IA") es una de las características más innovadoras de este portfolio.

- **Tecnología**: Utiliza el SDK de Google Generative AI para Web.
- **Prompt Engineering**: El modelo recibe un "Prompt de Sistema" detallado con mi información profesional, permitiéndole responder preguntas específicas sobre mi experiencia, estudios y habilidades con un tono profesional y cercano.
- **Privacidad**: La conversación se procesa directamente entre el navegador del usuario y la API de Google; no se almacenan datos en servidores intermedios.

---

## 📄 Licencia

Este proyecto es Open Source y está disponible bajo la **Licencia MIT**.

Copyright (c) 2024-2025 Mariano López.

---

<div align="center">
  <h3>¿Te ha gustado este proyecto?</h3>
  <p>Si encuentras útil este código o te inspira para tu propio portfolio, ¡agradecería mucho una estrella en el repositorio! ⭐</p>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/mariano-lopez-garcia/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/Marlo-Byte)

</div>
