# Solución de Problemas Railway - Error 502

## Problema Actual
El backend desplegado en Railway muestra error 502 "Application failed to respond" a pesar de tener:
- ✅ Variable GEMINI_API_KEY configurada
- ✅ Código actualizado para producción
- ✅ Archivos de configuración railway.toml y package.json

## Pasos para Resolver el Error 502

### 1. Verificar Configuración del Servicio en Railway

1. Ve a tu proyecto en Railway: https://railway.app/dashboard
2. Selecciona tu servicio backend
3. Ve a la pestaña **"Settings"**
4. En **"Build & Deploy"**, verifica:
   - **Root Directory**: Debe estar vacío o ser `/`
   - **Build Command**: Debe ser `npm install` o estar vacío
   - **Start Command**: Debe ser `npm start`

### 2. Verificar Variables de Entorno

1. Ve a la pestaña **"Variables"**
2. Confirma que tienes:
   - `GEMINI_API_KEY`: Tu clave de API de Gemini
   - `NODE_ENV`: `production` (opcional pero recomendado)
   - `PORT`: Railway lo asigna automáticamente

### 3. Verificar Logs de Despliegue

1. Ve a la pestaña **"Deployments"**
2. Haz clic en el último deployment
3. Revisa los logs de **"Build"** y **"Deploy"**
4. Busca errores como:
   - Dependencias faltantes
   - Errores de sintaxis
   - Problemas con GEMINI_API_KEY

### 4. Forzar Redespliegue

1. Ve a la pestaña **"Deployments"**
2. Haz clic en **"Redeploy"** en el último deployment
3. Espera a que termine el proceso
4. Verifica los logs nuevamente

### 5. Verificar Estructura del Proyecto

Asegúrate de que Railway esté leyendo la estructura correcta:
```
Portfolio-Personal/
├── package.json (con script "start")
├── railway.toml
└── backend/
    ├── package.json
    ├── server.js
    └── node_modules/
```

### 6. Comandos de Prueba Local

Antes de desplegar, prueba localmente:
```bash
# En la carpeta raíz
npm start

# Debería ejecutar: cd backend && npm install && npm start
```

### 7. URLs de Prueba

Una vez funcionando, prueba estos endpoints:
- Health check: `https://tu-dominio.railway.app/api/health`
- Chat: `https://tu-dominio.railway.app/api/chat` (POST)

## Configuración Alternativa

Si el problema persiste, puedes intentar:

1. **Crear un nuevo servicio** en Railway específicamente para el backend
2. **Conectar solo la carpeta backend** como repositorio
3. **Usar las variables de entorno** directamente sin archivos de configuración

## Contacto con Soporte

Si ninguna solución funciona:
1. Ve a Railway Discord: https://discord.gg/railway
2. Comparte los logs de deployment
3. Menciona que tienes error 502 con Node.js/Express

---

**Nota**: El error 502 generalmente indica que Railway no puede iniciar tu aplicación. Los logs de deployment te darán la información exacta del problema.