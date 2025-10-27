# 📚 Documentación del Portfolio

Esta carpeta contiene toda la documentación del proyecto.

## 📋 Archivos disponibles

- **[CHAT_SETUP.md](./CHAT_SETUP.md)** - Guía completa para configurar el chat con IA
- **[README.md](./README.md)** - Este archivo

## 🚀 Guías rápidas

### Configurar el chat IA
1. Obtén tu API key en [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Configura `VITE_GEMINI_API_KEY` en tu archivo `.env`
3. Ejecuta `npm run dev`

### Estructura del proyecto
```
src/
├── components/     # Componentes Vue
├── composables/    # Lógica reutilizable
├── config/         # Configuración centralizada
├── types/          # Definiciones TypeScript
├── utils/          # Utilidades
└── views/          # Vistas principales
```

## 🔧 Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run test` - Ejecutar tests
- `npm run lint` - Linter de código
- `npm run clean` - Limpiar archivos temporales
