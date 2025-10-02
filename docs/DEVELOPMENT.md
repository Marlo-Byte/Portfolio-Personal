# 🛠️ Guía de Desarrollo

## Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Git**

## Configuración del Entorno de Desarrollo

### 1. Clonar el repositorio
```bash
git clone https://github.com/Marlo-Byte/Portfolio-Personal.git
cd Portfolio-Personal
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local

# Editar .env.local con tus valores
GEMINI_API_KEY=tu_api_key_de_gemini
VITE_API_URL=http://localhost:3001
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con hot-reload
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run deploy` - Desplegar a GitHub Pages
- `npm run lint` - Linter de código
- `npm run type-check` - Verificación de tipos TypeScript

## Estructura del Proyecto

```
src/
├── components/          # Componentes Vue organizados
│   ├── layout/         # Componentes de estructura (Navbar, Footer, Chat)
│   └── sections/       # Secciones principales (Hero, About, Skills, etc.)
├── composables/        # Lógica reutilizable de Vue
├── types/             # Definiciones de tipos TypeScript
├── utils/             # Funciones utilitarias
├── assets/            # Estilos y recursos estáticos
├── router/            # Configuración de Vue Router
└── views/             # Vistas principales
```

## Convenciones de Código

### Nombres de Archivos
- Componentes: `PascalCase.vue` (ej: `HeroSection.vue`)
- Utilidades: `camelCase.ts` (ej: `useTheme.ts`)
- Tipos: `camelCase.ts` con sufijo `types` si es necesario

### Estructura de Componentes Vue
```vue
<script setup lang="ts">
// 1. Imports
// 2. Props/Emits
// 3. Reactive data
// 4. Computed
// 5. Methods
// 6. Lifecycle hooks
</script>

<template>
  <!-- Template con comentarios descriptivos -->
</template>

<style scoped>
/* Estilos específicos del componente */
</style>
```

### CSS/SCSS
- Usar variables CSS personalizadas para temas
- Preferir `scoped` styles en componentes
- Usar clases utilitarias cuando sea apropiado

## API del Chat con IA

### Endpoint Local
```
POST http://localhost:3001/api/chat
```

### Payload
```json
{
  "message": "Mensaje del usuario",
  "sessionId": "uuid-opcional"
}
```

### Response
```json
{
  "response": "Respuesta de la IA",
  "sessionId": "uuid-de-sesion"
}
```

## Debugging

### Vue DevTools
- Instalar extensión de Vue DevTools
- Usar `console.log` con prefijos descriptivos
- Aprovechar las herramientas de desarrollo de Vite

### Errores Comunes

1. **Error de CORS**: Verificar configuración del backend
2. **Módulo no encontrado**: Verificar rutas de importación
3. **Variables de entorno**: Asegurar que empiecen con `VITE_`

## Testing

```bash
# Ejecutar tests (cuando estén configurados)
npm run test

# Tests en modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

## Contribuir

1. Fork el repositorio
2. Crear una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit los cambios (`git commit -m 'feat: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## Recursos Útiles

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Google Gemini API](https://ai.google.dev/docs)
