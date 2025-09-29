# 🚀 Deploy en Vercel - Portfolio Mariano López

## 📋 Pasos para Deploy

### 1. Preparar el Repositorio
✅ **Ya está listo** - Los archivos de configuración ya están creados:
- `vercel.json` - Configuración de Vercel
- `api/index.js` - Serverless function para el backend
- `vite.config.ts` - Actualizado para Vercel

### 2. Deploy en Vercel

1. **Ir a [vercel.com](https://vercel.com)**
2. **Iniciar sesión** con tu cuenta de GitHub
3. **Importar proyecto**:
   - Hacer clic en "New Project"
   - Seleccionar tu repositorio `Portfolio-Personal`
   - Vercel detectará automáticamente que es un proyecto Vue.js

4. **Configurar variables de entorno**:
   - En la sección "Environment Variables"
   - Agregar: `GEMINI_API_KEY` = `tu_api_key_de_gemini`

5. **Deploy**:
   - Hacer clic en "Deploy"
   - Vercel construirá y desplegará automáticamente

### 3. Configuración Post-Deploy

Después del primer deploy, necesitas:

1. **Obtener la URL de Vercel** (algo como `https://portfolio-personal-xxx.vercel.app`)

2. **Actualizar CORS** en `api/index.js`:
   - Agregar tu URL de Vercel al array de `origin`
   - O usar un wildcard para desarrollo: `origin: true`

3. **Redeploy** para aplicar los cambios de CORS

## 🔧 Variables de Entorno

### En Vercel Dashboard:
```
GEMINI_API_KEY = tu_api_key_de_google_gemini
NODE_ENV = production
```

### Para desarrollo local (.env):
```
GEMINI_API_KEY=tu_api_key_de_google_gemini
NODE_ENV=development
```

## 📁 Estructura del Proyecto

```
Portfolio-Personal/
├── api/
│   └── index.js          # Serverless function para Vercel
├── backend/
│   └── server.js         # Servidor original (para Railway)
├── src/                  # Frontend Vue.js
├── vercel.json           # Configuración de Vercel
└── vite.config.ts        # Configuración de Vite
```

## 🌐 URLs después del Deploy

- **Frontend**: `https://tu-proyecto.vercel.app`
- **API Chat**: `https://tu-proyecto.vercel.app/api/chat`
- **Health Check**: `https://tu-proyecto.vercel.app/api/health`

## 🆓 Límites del Plan Gratuito

- **Bandwidth**: Ilimitado para portfolios personales
- **Builds**: 100 builds/mes
- **Serverless Functions**: 100GB-hours/mes
- **Dominio personalizado**: Incluido

## 🔄 Deploy Automático

Cada vez que hagas `git push` a tu repositorio:
1. Vercel detectará los cambios
2. Construirá automáticamente el proyecto
3. Desplegará la nueva versión
4. Te notificará por email

## 🐛 Troubleshooting

### Error de CORS:
- Verificar que la URL de Vercel esté en el array `origin` del CORS
- Usar `origin: true` para desarrollo

### Error de API Key:
- Verificar que `GEMINI_API_KEY` esté configurada en Vercel Dashboard
- Verificar que la API key sea válida

### Error de Build:
- Revisar los logs en Vercel Dashboard
- Verificar que todas las dependencias estén en `package.json`

## 📞 Soporte

Si tienes problemas:
1. Revisar los logs en Vercel Dashboard
2. Verificar la documentación de Vercel
3. Comprobar que todas las variables de entorno estén configuradas

