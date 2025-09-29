# Portfolio Personal - Mariano López

## 📋 Descripción

Portfolio personal desarrollado con Vue.js 3, TypeScript y Vite. Presenta mis habilidades como desarrollador Full Stack, proyectos realizados y información de contacto. El sitio incluye modo oscuro/claro, animaciones suaves, diseño responsive y un chat con IA personalizada.

## 🚀 Tecnologías Utilizadas

- **Frontend Framework**: Vue.js 3 con Composition API
- **Lenguaje**: TypeScript
- **Build Tool**: Vite
- **Gestión de Estado**: Pinia
- **Routing**: Vue Router 4
- **Estilos**: CSS3 con variables CSS personalizadas
- **Email Service**: EmailJS para formulario de contacto
- **Backend**: Node.js + Express
- **IA**: Google Gemini AI para chat personalizado
- **Deployment**: Vercel (Full-Stack)

## 📁 Estructura del Proyecto

```
Portfolio-Personal/
├── api/                     # Serverless functions para Vercel
│   └── index.js            # API del chat con IA
├── backend/                 # Backend original (legacy)
│   ├── server.js           # Servidor Express original
│   └── package.json        # Dependencias del backend
├── public/                  # Archivos estáticos
│   ├── certificates/       # Certificados en PDF
│   ├── images/            # Imágenes del portfolio
│   │   ├── projects/      # Capturas de proyectos
│   │   ├── marianotraje.jpg # Foto profesional
│   │   └── yo_animado.jpg # Avatar animado
│   └── favicon.ico        # Icono del sitio
├── src/                    # Frontend Vue.js
│   ├── components/        # Componentes Vue reutilizables
│   │   ├── NavbarComponent.vue  # Barra de navegación
│   │   ├── HeroSection.vue      # Sección principal/presentación
│   │   ├── AboutSection.vue     # Sección "Sobre mí"
│   │   ├── SkillsSection.vue    # Habilidades técnicas
│   │   ├── ProjectsSection.vue  # Galería de proyectos
│   │   ├── ContactSection.vue   # Formulario de contacto
│   │   └── FooterSection.vue    # Pie de página
│   ├── assets/            # Recursos del proyecto
│   │   ├── base.css      # Estilos base y variables CSS
│   │   ├── main.css      # Estilos principales
│   │   └── styles/       # Estilos adicionales
│   ├── router/           # Configuración de rutas
│   │   └── index.ts      # Definición de rutas
│   ├── views/            # Vistas principales
│   │   └── HomeView.vue  # Vista principal
│   ├── App.vue           # Componente raíz
│   └── main.ts           # Punto de entrada de la aplicación
├── vercel.json            # Configuración de Vercel
├── package.json           # Dependencias y scripts
├── vite.config.ts         # Configuración de Vite
├── tsconfig.json          # Configuración de TypeScript
├── VERCEL_DEPLOY.md       # Guía de deploy en Vercel
└── README.md             # Este archivo
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

## 🎨 Características

- **Responsive Design**: Adaptable a todos los dispositivos
- **Modo Oscuro/Claro**: Toggle de tema con persistencia
- **Animaciones Suaves**: Transiciones y efectos visuales
- **SEO Optimizado**: Meta tags y estructura semántica
- **Performance**: Optimizado para carga rápida
- **Accesibilidad**: Cumple estándares de accesibilidad web

## 🚀 Instalación y Uso

1. **Clonar el repositorio**

```bash
git clone https://github.com/Marlo-Byte
cd Portfolio3
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

El proyecto está configurado para desplegarse automáticamente en **Vercel**:

1. **Conecta tu repositorio** en [vercel.com](https://vercel.com)
2. **Configura las variables de entorno**:
   - `GEMINI_API_KEY`: Tu API key de Google Gemini
3. **Deploy automático** en cada push a GitHub

Para más detalles, consulta [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)

## 🤖 Chat con IA Personalizada

El portfolio incluye un chat con IA que responde como Mariano López:

- **Backend**: API serverless en Vercel Functions
- **IA**: Google Gemini AI
- **Características**: Memoria de conversación, respuestas personalizadas
- **Endpoints**:
  - `POST /api/chat` - Chat principal
  - `GET /api/health` - Health check
  - `GET /api/info` - Información de la API

## 📝 Configuración de Variables de Entorno

### Para Vercel (Producción):
```
GEMINI_API_KEY=tu_api_key_de_google_gemini
```

### Para desarrollo local (.env):
```
GEMINI_API_KEY=tu_api_key_de_google_gemini
NODE_ENV=development
```

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

## 👨‍💻 Autor

**Mariano López**

- Email: marianolopgarcia@gmail.com
- Teléfono: +54 9 387 4140978
- Estudiante de Técnico Superior en Programación - TECLAB

---

_Este portfolio fue desarrollado como proyecto personal para mostrar habilidades en desarrollo web moderno con Vue.js y TypeScript._
