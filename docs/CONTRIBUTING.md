# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al Portfolio Personal! Este documento te ayudará a comenzar.

## 📋 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código:

- **Sé respetuoso**: Trata a todos con respeto y consideración
- **Sé inclusivo**: Acoge diferentes perspectivas y experiencias
- **Sé constructivo**: Proporciona feedback útil y constructivo
- **Sé paciente**: Entiende que todos estamos aprendiendo

## 🚀 Cómo Contribuir

### 1. Fork del Repositorio

```bash
# Fork en GitHub, luego clonar tu fork
git clone https://github.com/TU_USUARIO/Portfolio-Personal.git
cd Portfolio-Personal
```

### 2. Configurar el Entorno

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# Iniciar servidor de desarrollo
npm run dev
```

### 3. Crear una Rama

```bash
# Crear rama desde main
git checkout -b tipo/descripcion-breve

# Ejemplos:
git checkout -b feature/nueva-seccion-blog
git checkout -b fix/correccion-responsive
git checkout -b docs/actualizar-readme
```

### 4. Hacer Cambios

- Sigue las convenciones de código existentes
- Escribe mensajes de commit claros
- Prueba tus cambios localmente
- Actualiza documentación si es necesario

### 5. Commit y Push

```bash
# Staging de cambios
git add .

# Commit con mensaje descriptivo
git commit -m "tipo: descripción breve

Descripción más detallada si es necesario.
Explica qué cambió y por qué."

# Push a tu fork
git push origin nombre-de-tu-rama
```

### 6. Crear Pull Request

1. Ve a GitHub y crea un Pull Request
2. Usa el template de PR si existe
3. Describe claramente los cambios
4. Enlaza issues relacionados si los hay

## 🎯 Tipos de Contribuciones

### 🐛 Reportar Bugs

**Antes de reportar:**
- Verifica que no exista un issue similar
- Reproduce el bug en la última versión
- Incluye información del entorno

**Template de Bug Report:**
```markdown
## Descripción del Bug
Descripción clara del problema.

## Pasos para Reproducir
1. Ir a '...'
2. Hacer clic en '....'
3. Ver error

## Comportamiento Esperado
Lo que debería suceder.

## Comportamiento Actual
Lo que sucede actualmente.

## Entorno
- OS: [ej. Windows 10]
- Navegador: [ej. Chrome 91]
- Versión de Node: [ej. 18.0.0]
```

### ✨ Sugerir Mejoras

**Template de Feature Request:**
```markdown
## Descripción de la Funcionalidad
Descripción clara de la mejora propuesta.

## Motivación
¿Por qué sería útil esta funcionalidad?

## Solución Propuesta
Describe cómo te imaginas que funcionaría.

## Alternativas Consideradas
¿Hay otras formas de resolver esto?
```

### 📝 Mejorar Documentación

- Corregir errores tipográficos
- Clarificar instrucciones confusas
- Agregar ejemplos útiles
- Traducir contenido

## 📏 Estándares de Código

### Convenciones de Nombres

- **Componentes Vue**: `PascalCase.vue` (ej: `HeroSection.vue`)
- **Composables**: `camelCase.ts` con prefijo `use` (ej: `useTheme.ts`)
- **Utilidades**: `camelCase.ts` (ej: `formatDate.ts`)
- **Tipos**: `PascalCase` (ej: `interface UserProfile`)

### Estructura de Componentes

```vue
<script setup lang="ts">
// 1. Imports (externos primero, luego internos)
import { ref, computed, onMounted } from 'vue'
import type { PropType } from 'vue'
import { useTheme } from '@/composables/useTheme'

// 2. Props & Emits
interface Props {
  title: string
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
})

const emit = defineEmits<{
  click: [id: string]
  change: [value: boolean]
}>()

// 3. Composables
const { isDark } = useTheme()

// 4. Reactive data
const isLoading = ref(false)
const items = ref<Item[]>([])

// 5. Computed properties
const filteredItems = computed(() => {
  return items.value.filter(item => item.active)
})

// 6. Methods
const handleClick = () => {
  emit('click', 'item-id')
}

// 7. Lifecycle hooks
onMounted(() => {
  // Initialization logic
})
</script>

<template>
  <div class="component-name">
    <!-- Template con comentarios cuando sea necesario -->
  </div>
</template>

<style scoped>
.component-name {
  /* Estilos específicos del componente */
}
</style>
```

### CSS/SCSS

- Usar variables CSS personalizadas para temas
- Preferir `scoped` styles en componentes
- Seguir metodología BEM para clases CSS
- Usar nombres descriptivos

```css
/* ✅ Bueno */
.hero-section__title {
  color: var(--text-primary);
}

.hero-section__button--primary {
  background: var(--primary-color);
}

/* ❌ Malo */
.title {
  color: #333;
}

.btn1 {
  background: blue;
}
```

### TypeScript

- Usar tipos explícitos cuando sea útil
- Crear interfaces para objetos complejos
- Evitar `any`, usar `unknown` si es necesario

```typescript
// ✅ Bueno
interface User {
  id: string
  name: string
  email: string
}

const createUser = (userData: Omit<User, 'id'>): User => {
  return {
    id: generateId(),
    ...userData
  }
}

// ❌ Malo
const createUser = (userData: any): any => {
  return {
    id: Math.random(),
    ...userData
  }
}
```

## 🔍 Testing

```bash
# Ejecutar tests (cuando estén disponibles)
npm run test

# Tests con watch
npm run test:watch

# Coverage
npm run test:coverage
```

## 📝 Mensajes de Commit

Usar [Conventional Commits](https://conventionalcommits.org/):

```
tipo(ámbito): descripción breve

Descripción más detallada si es necesario.

Fixes #123
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato/estilo
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

**Ejemplos:**
```
feat(chat): agregar soporte para archivos adjuntos
fix(responsive): corregir layout en móviles
docs(readme): actualizar instrucciones de instalación
style(components): aplicar formato consistente
refactor(utils): simplificar función de validación
```

## 🎉 Reconocimiento

Los contribuidores serán reconocidos en:
- README.md (sección de contribuidores)
- Release notes
- Comentarios de agradecimiento en PRs

## ❓ ¿Necesitas Ayuda?

- **Issues**: Para bugs y feature requests
- **Discussions**: Para preguntas generales
- **Email**: marianolopgarcia@gmail.com

## 📚 Recursos Útiles

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Conventional Commits](https://conventionalcommits.org/)

---

¡Gracias por contribuir! 🙏
