# Cómo Verificar que Node.js se Instaló Correctamente en Railway

## 🔍 Pasos para Verificar la Instalación

### 1. Revisar los Logs de Deployment

**Accede a Railway Dashboard:**
1. Ve a https://railway.app/dashboard
2. Selecciona tu proyecto
3. Haz clic en tu servicio backend
4. Ve a la pestaña **"Deployments"**
5. Haz clic en el deployment más reciente
6. Haz clic en **"View Logs"**

**Busca estas líneas en los logs:**
```
✅ CORRECTO - Deberías ver:
- "Installing nodejs_20"
- "Installing npm"
- "npm install" ejecutándose sin errores
- "Server running on port..."

❌ INCORRECTO - Si ves:
- "/bin/bash: line 1: npm: command not found"
- "nodejs: command not found"
- Errores de instalación de dependencias
```

### 2. Verificar el Endpoint de Salud

**Prueba la URL de tu API:**
```bash
# Reemplaza con tu URL de Railway
curl https://tu-proyecto.up.railway.app/api/health
```

**Respuesta esperada:**
```json
{
  "status": "OK",
  "timestamp": "2025-08-25T04:06:57.150Z",
  "service": "Mariano López Portfolio Chat API"
}
```

### 3. Verificar Variables de Entorno

**En Railway Dashboard:**
1. Ve a la pestaña **"Variables"**
2. Confirma que tienes:
   - `GEMINI_API_KEY`: Tu clave de API
   - `NODE_ENV`: `production`
   - `PORT`: (Railway lo asigna automáticamente)

### 4. Verificar Configuración del Servicio

**En Railway Dashboard → Settings:**
- **Root Directory**: Debe estar vacío o ser `/`
- **Build Command**: Debe estar vacío (Nixpacks lo maneja)
- **Start Command**: Debe ser `npm start`
- **Watch Patterns**: Debe incluir todos los archivos

## 🚀 Señales de Éxito

### ✅ Todo Funciona Correctamente Cuando:

1. **Los logs muestran:**
   ```
   Installing nodejs_20... ✓
   Installing npm... ✓
   npm install... ✓
   🚀 Servidor corriendo en puerto 3001
   ✅ Gemini API key configurada correctamente
   ```

2. **El endpoint responde:**
   - Status Code: 200
   - JSON con información del servicio

3. **No hay errores 502:**
   - La aplicación responde correctamente
   - No aparece "Application failed to respond"

## 🔧 Si Node.js NO se Instaló Correctamente

### Soluciones Paso a Paso:

1. **Forzar Redespliegue:**
   - Ve a Deployments → Redeploy
   - Espera a que termine el proceso
   - Revisa los logs nuevamente

2. **Verificar Archivos de Configuración:**
   - Confirma que `nixpacks.toml` existe en la raíz
   - Confirma que `railway.toml` tiene la configuración correcta

3. **Revisar package.json:**
   - Debe tener el script `"start": "cd backend && npm install && npm start"`
   - Debe estar en la raíz del proyecto

## 📋 Checklist de Verificación

- [ ] Los logs muestran instalación de Node.js 20
- [ ] Los logs muestran instalación de npm
- [ ] El comando `npm install` se ejecuta sin errores
- [ ] El servidor inicia correctamente
- [ ] El endpoint `/api/health` responde con status 200
- [ ] No hay errores 502 en las pruebas
- [ ] Las variables de entorno están configuradas
- [ ] El chatbot se conecta desde GitHub Pages

## 🆘 Contactar Soporte

Si después de seguir todos los pasos el problema persiste:

1. **Railway Discord**: https://discord.gg/railway
2. **Comparte**:
   - Los logs completos del deployment
   - Tu configuración de `nixpacks.toml`
   - Tu configuración de `railway.toml`
   - El mensaje de error específico

---

**💡 Tip**: El proceso de instalación puede tomar 2-5 minutos. Ten paciencia y revisa los logs en tiempo real durante el deployment.