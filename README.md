# 🚀 Portfolio Personal - Mariano López

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-181717?style=flat-square&logo=github)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> Portfolio personal full stack con chat IA integrado, desarrollado con tecnologías modernas y mejores prácticas de desarrollo web.

## 🌟 Demo en Vivo

- **🌐 Sitio Web**: [https://marlo-byte.github.io/Portfolio-Personal/](https://marlo-byte.github.io/Portfolio-Personal/)
- **🤖 Chat IA**: Prueba el chat inteligente integrado
- **📱 Responsive**: Optimizado para todos los dispositivos

## 📋 Descripción

Portfolio personal desarrollado con Vue.js 3, TypeScript y Node.js. Presenta mis habilidades como desarrollador Full Stack, proyectos realizados e información profesional. Incluye un sistema de chat inteligente con IA Gemini, diseño responsive con Vuetify/Tailwind CSS, modo oscuro/claro, animaciones suaves y certificaciones profesionales.

## 🚀 Stack Tecnológico

### Frontend
- **Framework**: Vue.js 3 con Composition API
- **Lenguaje**: TypeScript 5.8
- **Build Tool**: Vite 7.0
- **UI Framework**: Vuetify + Tailwind CSS
- **Gestión de Estado**: Pinia
- **Routing**: Vue Router 4
- **Estilos**: CSS3 con variables personalizadas

### IA Integration
- **IA**: Google Gemini 2.0 Flash Experimental
- **Integración**: Directa desde frontend
- **Gestión**: Composable personalizado (useGeminiChat)

### Servicios
- **Email**: EmailJS para formulario de contacto
- **Deployment**: GitHub Pages (Frontend)
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions automático

### Herramientas de Desarrollo
- **Linting**: ESLint + Prettier
- **Testing**: Vitest
- **DevTools**: Vue DevTools
- **Version Control**: Git + GitHub

## 📁 Estructura del Proyecto

```
Portfolio-Personal/
├── .env                     # Variables de entorno (API keys)
├── .gitignore              # Archivos ignorados por Git
├── public/                  # Archivos estáticos
│   ├── certificates/       # Certificados en PDF
│   ├── images/            # Imágenes del portfolio
│   │   ├── projects/      # Capturas de proyectos
│   │   ├── TRAJE_FORMAL.jpg # Foto profesional
│   │   └── yo_animado.jpg # Avatar animado
│   └── favicon.ico        # Icono del sitio
├── src/                    # Código fuente principal
│   ├── components/        # Componentes Vue organizados
│   │   ├── layout/        # Componentes de estructura
│   │   │   ├── NavbarComponent.vue  # Barra de navegación
│   │   │   ├── FooterSection.vue    # Pie de página
│   │   │   └── ChatWidget.vue       # Widget de chat con IA
│   │   └── sections/      # Secciones principales
│   │       ├── HeroSection.vue      # Sección principal/presentación
│   │       ├── AboutSection.vue     # Sección "Sobre mí"
│   │       ├── SkillsSection.vue    # Habilidades técnicas
│   │       ├── ProjectsSection.vue  # Galería de proyectos
│   │       └── ContactSection.vue   # Formulario de contacto
│   ├── composables/       # Lógica reutilizable
│   │   ├── ai/            # Composables de IA
│   │   │   └── useGeminiChat.ts # Chat con Gemini
│   │   └── useTheme.ts    # Gestión de temas
│   ├── config/            # Configuración centralizada
│   │   ├── constants.ts   # Constantes de la app
│   │   ├── env.ts         # Variables de entorno
│   │   └── index.ts       # Exportaciones
│   ├── types/             # Definiciones TypeScript
│   │   ├── components.ts  # Tipos de componentes
│   │   ├── api.ts         # Tipos de API
│   │   └── index.ts       # Exportaciones
│   ├── utils/             # Utilidades organizadas
│   │   ├── dom.ts         # Utilidades del DOM
│   │   ├── format.ts      # Formateo de datos
│   │   ├── helpers.ts     # Helpers generales
│   │   └── index.ts       # Exportaciones
│   ├── assets/            # Recursos del proyecto
│   │   └── css/          # Estilos CSS organizados
│   │       ├── base.css  # Variables y estilos base
│   │       ├── main.css  # Estilos principales
│   │       └── global.css # Estilos globales
│   ├── router/           # Configuración de Vue Router
│   │   └── index.ts      # Definición de rutas
│   ├── views/            # Vistas principales
│   │   └── HomeView.vue  # Vista principal
│   ├── App.vue           # Componente raíz
│   └── main.ts           # Punto de entrada
├── docs/                  # Documentación
│   ├── README.md         # Índice de documentación
│   └── CHAT_SETUP.md     # Guía del chat IA
├── .vscode/              # Configuración de VS Code
│   ├── settings.json     # Configuración del editor
│   └── extensions.json   # Extensiones recomendadas
├── package.json          # Dependencias y scripts
├── vite.config.ts        # Configuración de Vite
├── tsconfig.json         # Configuración de TypeScript
└── README.md            # Este archivo
```

## 🧩 Componentes Principales

### NavbarComponent.vue

- Barra de navegación responsive
- Toggle para modo oscuro/claro
- Navegación suave entre secciones
- Menú hamburguesa para móviles

### HeroSection.vue

- Sección de presentación principal
- Animaciones de entrada
- Botones de llamada a la acción
- Información personal básica

### AboutSection.vue

- Información detallada sobre el desarrollador
- Experiencia y formación académica
- Foto profesional

### SkillsSection.vue

- Showcase de habilidades técnicas
- Iconos y descripciones de tecnologías
- Organización por categorías

### ProjectsSection.vue

- Galería de proyectos realizados
- Filtros por categoría
- Enlaces a demos y repositorios
- Información técnica de cada proyecto

### ContactSection.vue

- Formulario de contacto funcional
- Integración con EmailJS
- Información de contacto
- Validación de formularios

### FooterSection.vue

- Enlaces a redes sociales
- Información de copyright
- Enlaces adicionales

## ⚙️ Configuración y Scripts

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Build
npm run build        # Construye para producción
npm run preview      # Preview del build

# Testing
npm run test:unit    # Ejecuta tests unitarios

# Linting y Formato
npm run lint         # Ejecuta ESLint
npm run format       # Formatea código con Prettier
```

### Dependencias Principales

- **Vue 3**: Framework principal
- **Pinia**: Gestión de estado
- **Vue Router**: Enrutamiento
- **EmailJS**: Servicio de email
- **TypeScript**: Tipado estático
- **Vite**: Build tool y dev server

### Dependencias de Desarrollo

- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **Vitest**: Testing framework
- **Vue DevTools**: Herramientas de desarrollo

## ✨ Características Principales

### 🎨 Diseño y UX
- **Responsive Design**: Adaptable a todos los dispositivos (móvil, tablet, desktop)
- **Modo Oscuro/Claro**: Toggle de tema con persistencia local
- **Animaciones Suaves**: Transiciones y efectos visuales con IntersectionObserver
- **UI Moderna**: Diseño limpio con Vuetify y Tailwind CSS
- **Scroll Suave**: Navegación fluida entre secciones

### 🤖 Chat Inteligente con IA
- **IA Personalizada**: Responde como Mariano López con contexto profesional
- **Memoria de Conversación**: Mantiene el contexto durante la sesión
- **Respuestas en Tiempo Real**: Integración con Google Gemini 2.0
- **Fallback Robusto**: Sistema de respuestas de emergencia

### 📄 Gestión de Certificaciones
- **Visualización de PDFs**: Sistema integrado para mostrar certificaciones
- **Certificados Profesionales**: PEL, IA, Higiene y Seguridad, Gestor de Transporte
- **Enlaces Directos**: Acceso rápido a documentos oficiales

### ⚡ Performance y SEO
- **Optimización de Carga**: Lazy loading y code splitting
- **SEO Optimizado**: Meta tags dinámicos y estructura semántica
- **PWA Ready**: Preparado para Progressive Web App
- **Accesibilidad**: Cumple estándares WCAG 2.1

## 🚀 Instalación y Uso

### 📋 Prerrequisitos

- Node.js 20+
- npm o yarn
- Git

### 🔧 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/Marlo-Byte/Portfolio-Personal.git
cd Portfolio-Personal
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Ejecutar en desarrollo**

```bash
npm run dev
```

4. **Build para producción**

```bash
npm run build
```

## 🌐 Deployment

El proyecto está configurado para desplegarse automáticamente en **GitHub Pages**:

1. **Configura las variables de entorno** en tu archivo `.env`:
   - `VITE_GEMINI_API_KEY`: Tu API key de Google Gemini
2. **Deploy automático** con GitHub Actions en cada push a la rama `main`
3. **El sitio estará disponible** en `https://tu-usuario.github.io/Portfolio-Personal/`

### Deploy manual:
```bash
npm run build
npm run deploy
```

## 📁 Estructura del Proyecto

```
Portfolio-Personal/
├── 📁 src/                          # Código fuente principal
│   ├── 📁 components/              # Componentes Vue organizados
│   │   ├── 📁 layout/              # Componentes de estructura
│   │   │   ├── NavbarComponent.vue # Barra de navegación
│   │   │   ├── FooterSection.vue   # Pie de página
│   │   │   └── ChatWidget.vue      # Widget de chat con IA
│   │   └── 📁 sections/            # Secciones principales
│   │       ├── HeroSection.vue     # Sección hero/presentación
│   │       ├── AboutSection.vue    # Sobre mí y certificaciones
│   │       ├── SkillsSection.vue   # Habilidades técnicas
│   │       ├── ProjectsSection.vue # Proyectos destacados
│   │       └── ContactSection.vue  # Información de contacto
│   ├── 📁 composables/             # Lógica reutilizable de Vue
│   │   └── useTheme.ts            # Manejo de temas claro/oscuro
│   ├── 📁 types/                   # Definiciones TypeScript
│   │   └── index.ts               # Tipos principales del proyecto
│   ├── 📁 utils/                   # Funciones utilitarias
│   │   └── index.ts               # Utilidades generales
│   ├── 📁 assets/                  # Estilos y recursos
│   │   └── 📁 styles/             # Estilos CSS organizados
│   ├── 📁 router/                  # Configuración de Vue Router
│   └── 📁 views/                   # Vistas principales
├── 📁 api/                         # Backend serverless (Vercel)
│   ├── index.js                   # API principal del chat
│   └── package.json               # Dependencias del backend
├── 📁 public/                      # Assets estáticos
│   ├── 📁 images/                 # Imágenes del proyecto
│   ├── 📁 certificates/           # Certificados PDF
│   └── 📁 cv/                     # Curriculum en PDF
├── 📁 docs/                        # Documentación del proyecto
│   ├── DEVELOPMENT.md             # Guía de desarrollo
│   └── DEPLOYMENT.md              # Guía de despliegue
├── vercel.json                     # Configuración de Vercel
├── package.json                    # Dependencias y scripts
└── README.md                       # Este archivo
```

## 🤖 Chat con IA Personalizada

El portfolio incluye un chat con IA que responde como Mariano López:

- **Integración**: Directa desde frontend usando Google Gemini AI
- **IA**: Google Gemini 2.0 Flash Experimental
- **Características**:
  - Memoria de conversación durante la sesión
  - Respuestas personalizadas como Mariano López
  - Gestión automática de sesiones
  - Fallback robusto en caso de errores
- **Composable**: `useGeminiChat.ts` para lógica reutilizable

## 📝 Configuración de Variables de Entorno

### Para desarrollo y producción (.env):
```env
# Google Gemini API Key
VITE_GEMINI_API_KEY=tu_api_key_de_google_gemini

# URL base para el chat (opcional)
VITE_CHAT_API_URL=https://generativelanguage.googleapis.com/v1beta
```

### Obtener API Key de Gemini:
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Crea una nueva API key
4. Copia la clave y pégala en tu archivo `.env`

## 📧 Configuración de EmailJS

Para que el formulario de contacto funcione, necesitas:

1. Crear una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configurar un servicio de email
3. Crear un template de email
4. Agregar las credenciales en el archivo `.env`

## 🔧 Personalización

### Cambiar Información Personal

- Editar los componentes en `src/components/`
- Actualizar imágenes en `public/images/`
- Modificar información de contacto en `ContactSection.vue`

### Agregar Nuevos Proyectos

- Editar el array `projects` en `ProjectsSection.vue`
- Agregar imágenes en `public/images/projects/`

### Modificar Estilos

- Variables CSS en `src/assets/base.css`
- Estilos específicos en cada componente

## 📄 Licencia

Este proyecto está licenciado bajo la **MIT License** - consulta el archivo [LICENSE](LICENSE) para más detalles.

### ¿Qué significa la licencia MIT?

La licencia MIT es una de las más permisivas y populares en el desarrollo de software:

- ✅ **Uso libre**: Puedes usar el código para cualquier propósito
- ✅ **Modificación**: Puedes modificar y adaptar el código
- ✅ **Distribución**: Puedes distribuir el código original o modificado
- ✅ **Uso comercial**: Permitido para proyectos comerciales
- ✅ **Sublicencia**: Puedes sublicenciar bajo otros términos

### Condiciones

- 📋 **Incluir copyright**: Debes incluir el aviso de copyright y la licencia en todas las copias
- 🚫 **Sin garantías**: El software se proporciona "tal como está", sin garantías

### ¿Por qué elegí MIT?

- **Simplicidad**: Fácil de entender y aplicar
- **Flexibilidad**: Permite máxima libertad de uso
- **Reconocimiento**: Ampliamente aceptada en la industria
- **Profesionalismo**: Muestra conocimiento de buenas prácticas

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

**Mariano López** - Desarrollador Full Stack

- 📧 **Email**: [marianolopgarcia@gmail.com](mailto:marianolopgarcia@gmail.com)
- 💼 **LinkedIn**: [Mariano López](https://linkedin.com/in/mariano-lopez)
- 🌐 **Portfolio**: [https://marlo-byte.github.io/Portfolio-Personal/](https://marlo-byte.github.io/Portfolio-Personal/)
- 📍 **Ubicación**: Salta Capital, Argentina

### 🎓 Formación y Certificaciones

- **Técnico Superior en Programación** - TECLAB (En curso)
- **Actualización Profesional en Inteligencia Artificial** - TECLAB
- **Programa de Entrenamiento Laboral (PEL)**
- **Higiene y Seguridad Laboral**
- **Gestor de Transporte**

## ⭐ Agradecimientos

- Vue.js team por el excelente framework
- Google por la API de Gemini
- Vercel por el hosting gratuito
- La comunidad open source por las herramientas utilizadas

---

<div align="center">

**¿Te gustó el proyecto? ¡Dale una ⭐ en GitHub!**

_Desarrollado con ❤️ por Mariano López usando Vue.js y TypeScript_

</div>
