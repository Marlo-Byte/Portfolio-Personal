# 🚀 Guía de Despliegue

## Opciones de Despliegue

### 1. Vercel (Recomendado para Fullstack)

#### Frontend + Backend en Vercel

1. **Conectar repositorio en Vercel**:
   - Ir a [vercel.com](https://vercel.com)
   - Conectar cuenta de GitHub
   - Importar el repositorio

2. **Configurar variables de entorno**:
   ```
   GEMINI_API_KEY=tu_api_key_de_gemini
   ```

3. **Configuración automática**:
   - Vercel detecta automáticamente Vue.js
   - La API serverless se despliega desde `/api/index.js`

4. **Dominios**:
   - Dominio automático: `https://tu-proyecto.vercel.app`
   - Dominio personalizado: Configurar en settings

### 2. GitHub Pages (Solo Frontend)

#### Para usar solo el frontend con backend externo

1. **Configurar variables de entorno**:
   ```bash
   # .env.production
   VITE_API_URL=https://tu-backend.vercel.app
   ```

2. **Desplegar**:
   ```bash
   npm run deploy
   ```

3. **URL del sitio**:
   ```
   https://tu-usuario.github.io/Portfolio-Personal/
   ```

### 3. Netlify

1. **Conectar repositorio**:
   - Ir a [netlify.com](https://netlify.com)
   - Conectar GitHub
   - Seleccionar repositorio

2. **Configuración de build**:
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Variables de entorno**:
   ```
   VITE_API_URL=https://tu-backend.vercel.app
   ```

## Configuración de Variables de Entorno

### Desarrollo Local (.env.local)
```env
GEMINI_API_KEY=tu_api_key_aqui
VITE_API_URL=http://localhost:3001
NODE_ENV=development
```

### Producción

#### Vercel
- Configurar en Dashboard > Settings > Environment Variables
- `GEMINI_API_KEY`: Tu API key de Gemini

#### GitHub Pages + Backend Externo
```env
# .env.production
VITE_API_URL=https://tu-backend-desplegado.vercel.app
```

## Estructura de Archivos para Despliegue

```
Portfolio-Personal/
├── api/                    # Serverless functions (Vercel)
│   ├── index.js           # Endpoint principal del chat
│   └── package.json       # Dependencias del backend
├── dist/                  # Build de producción (generado)
├── public/                # Assets estáticos
├── src/                   # Código fuente
├── vercel.json           # Configuración de Vercel
└── package.json          # Dependencias principales
```

## Comandos de Despliegue

### Build Local
```bash
# Construir para producción
npm run build

# Vista previa local de la build
npm run preview
```

### Despliegue Automático
```bash
# GitHub Pages
npm run deploy

# Vercel (desde CLI)
npx vercel --prod
```

## Verificación Post-Despliegue

### Checklist
- [ ] ✅ Sitio carga correctamente
- [ ] ✅ Todas las secciones son visibles
- [ ] ✅ Chat con IA funciona
- [ ] ✅ Certificados PDF se abren
- [ ] ✅ Enlaces externos funcionan
- [ ] ✅ Responsive design en móvil
- [ ] ✅ Tema oscuro/claro funciona

### URLs de Prueba
- **Frontend**: `https://tu-dominio.com`
- **API Health**: `https://tu-dominio.com/api/health`
- **Chat Test**: Usar el widget de chat en el sitio

## Troubleshooting

### Errores Comunes

#### 1. "Cannot find module" en Vercel
```json
// Verificar api/package.json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "@google/generative-ai": "^0.1.3"
  }
}
```

#### 2. CORS Error
```javascript
// api/index.js - Verificar configuración CORS
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://tu-dominio.vercel.app',
    'https://tu-usuario.github.io'
  ]
}
```

#### 3. 404 en rutas
```json
// vercel.json - Configurar rewrites
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### 4. Variables de entorno no funcionan
- Verificar que empiecen con `VITE_` para el frontend
- Reiniciar el servidor después de cambios
- Verificar configuración en el dashboard de hosting

## Monitoreo y Analytics

### Opciones Recomendadas
- **Vercel Analytics**: Integrado automáticamente
- **Google Analytics**: Agregar script en `index.html`
- **Plausible**: Alternativa privacy-friendly

### Logs y Debugging
- **Vercel**: Ver logs en Dashboard > Functions
- **Console**: Usar `console.log` con prefijos únicos
- **Error Tracking**: Considerar Sentry para producción

## Actualizaciones

### Proceso Recomendado
1. Desarrollar en rama `develop`
2. Hacer PR a `main`
3. Merge trigger automático de despliegue
4. Verificar en producción

### Rollback
```bash
# Vercel - rollback desde dashboard
# GitHub Pages - revertir commit y re-desplegar
git revert HEAD
npm run deploy
```
