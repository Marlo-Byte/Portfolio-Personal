# Solución Manual para Configurar Node.js en Railway

## 🎯 Objetivo
Configurar manualmente Railway para que instale Node.js correctamente y ejecute tu aplicación sin errores 502.

## 📋 Pasos Manuales Detallados

### 1. Acceder al Dashboard de Railway
1. Ve a [railway.app](https://railway.app)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto "Portfolio Personal"

### 2. Verificar la Configuración del Servicio
1. En el dashboard, haz clic en tu servicio
2. Ve a la pestaña **"Settings"**
3. Verifica estas configuraciones:
   - **Root Directory**: Debe estar vacío o ser `/`
   - **Start Command**: Debe ser `npm start`
   - **Build Command**: Debe estar vacío (Railway lo detectará automáticamente)

### 3. Configurar Variables de Entorno
1. En la pestaña **"Variables"**
2. Asegúrate de tener estas variables:
   ```
   NODE_ENV=production
   GEMINI_API_KEY=tu_clave_api_aquí
   NIXPACKS_NODEJS_VERSION=20
   ```
3. Si no existen, agrégalas manualmente:
   - Haz clic en **"+ New Variable"**
   - Ingresa el nombre y valor
   - Haz clic en **"Add"**

### 4. Forzar un Nuevo Deployment
1. Ve a la pestaña **"Deployments"**
2. Haz clic en **"Deploy"** (botón morado)
3. Selecciona **"Deploy Latest Commit"**
4. Espera a que termine el proceso (2-5 minutos)

### 5. Monitorear los Logs en Tiempo Real
1. Mientras se despliega, haz clic en el deployment activo
2. Selecciona **"View Logs"**
3. Busca estas líneas de éxito:
   ```
   ✓ Installing nodejs_20
   ✓ Installing npm
   ✓ Running npm install
   ✓ Server running on port 3001
   ```

### 6. Verificar que NO aparezcan estos errores:
```bash
❌ /bin/bash: line 1: npm: command not found
❌ node: command not found
❌ Error: Cannot find module
```

### 7. Probar el Endpoint
Una vez que el deployment esté completo:
1. Copia la URL de tu servicio
2. Agrega `/api/health` al final
3. Abre la URL en tu navegador
4. Deberías ver:
   ```json
   {
     "status": "OK",
     "timestamp": "2025-01-XX...",
     "service": "Mariano López Portfolio Chat API"
   }
   ```

## 🔧 Si Aún No Funciona

### Opción A: Recrear el Servicio
1. En el dashboard, ve a **"Settings"**
2. Scroll hasta abajo y haz clic en **"Delete Service"**
3. Confirma la eliminación
4. Haz clic en **"+ New"** → **"GitHub Repo"**
5. Selecciona tu repositorio nuevamente
6. Asegúrate de que detecte el `package.json` en la raíz

### Opción B: Cambiar el Builder
1. En **"Settings"** → **"Builder"**
2. Cambia de "Nixpacks" a "Dockerfile" (si tienes uno)
3. O mantén "Nixpacks" pero verifica que esté seleccionado

### Opción C: Verificar Archivos de Configuración
Asegúrate de que estos archivos estén en la raíz de tu proyecto:

**railway.toml:**
```toml
[build]
builder = "NIXPACKS"
watchPatterns = ["**"]

[deploy]
startCommand = "npm start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[env]
NODE_ENV = "production"
NIXPACKS_NODEJS_VERSION = "20"
```

**nixpacks.toml:**
```toml
[phases.setup]
nixPkgs = ["nodejs_20", "npm"]

[phases.install]
cmds = ["npm install"]

[phases.build]
cmds = ["cd backend && npm install"]

[start]
cmd = "npm start"
```

**package.json (raíz):**
```json
{
  "name": "portfolio-personal",
  "version": "1.0.0",
  "scripts": {
    "start": "cd backend && npm start"
  }
}
```

## 📞 Contactar Soporte
Si después de todos estos pasos aún tienes problemas:

1. Ve a [help.railway.app](https://help.railway.app)
2. Haz clic en **"Contact Support"**
3. Incluye esta información:
   - URL de tu proyecto
   - Mensaje de error específico
   - Logs del deployment
   - Menciona que necesitas Node.js 20 instalado

## ✅ Checklist Final
- [ ] Variables de entorno configuradas
- [ ] Start command es `npm start`
- [ ] Root directory vacío o `/`
- [ ] Deployment completado sin errores
- [ ] Logs muestran instalación exitosa de Node.js
- [ ] Endpoint `/api/health` responde correctamente
- [ ] No hay errores 502 en la aplicación

---

**💡 Tip**: El proceso completo puede tomar 10-15 minutos. Ten paciencia y revisa los logs cuidadosamente para identificar cualquier problema específico.