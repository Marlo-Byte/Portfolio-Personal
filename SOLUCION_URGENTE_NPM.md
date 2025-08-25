# 🚨 SOLUCIÓN URGENTE: npm: command not found

## ❌ El Problema
El error `/bin/bash: line 1: npm: command not found` significa que Railway NO está instalando Node.js correctamente.

## 🔥 SOLUCIÓN INMEDIATA

### 1. VERIFICAR Variables de Entorno (CRÍTICO)
En Railway Dashboard → Variables, DEBES tener exactamente estas 3 variables:

```
GEMINI_API_KEY = tu_clave_aquí
NODE_ENV = production
NIXPACKS_NODEJS_VERSION = 20
```

**⚠️ IMPORTANTE**: Si `NIXPACKS_NODEJS_VERSION` no existe, agrégala AHORA:
1. Haz clic en "+ New Variable"
2. Name: `NIXPACKS_NODEJS_VERSION`
3. Value: `20`
4. Haz clic en "Add"

### 2. FORZAR REDESPLIEGUE INMEDIATO
1. Ve a **Deployments**
2. Haz clic en **"Deploy"** (botón morado)
3. Selecciona **"Deploy Latest Commit"**
4. **ESPERA** y observa los logs

### 3. MONITOREAR LOGS EN TIEMPO REAL
Durante el deployment, busca estas líneas:

**✅ ÉXITO (lo que DEBES ver):**
```
✓ Installing nodejs_20
✓ Installing npm
✓ Running npm install
✓ Server starting...
```

**❌ FALLO (lo que NO debe aparecer):**
```
/bin/bash: line 1: npm: command not found
node: command not found
```

### 4. SI AÚN FALLA - CAMBIAR BUILDER
1. Ve a **Settings** → **Builder**
2. Cambia de "Nixpacks" a "Dockerfile" (si tienes uno)
3. O asegúrate de que "Nixpacks" esté seleccionado
4. Guarda y redespliega

### 5. VERIFICAR CONFIGURACIÓN DEL SERVICIO
En **Settings**, confirma:
- **Root Directory**: Vacío o `/`
- **Start Command**: `npm start`
- **Build Command**: Vacío

### 6. OPCIÓN NUCLEAR - RECREAR SERVICIO
Si nada funciona:
1. **Settings** → Scroll abajo → **"Delete Service"**
2. Confirma eliminación
3. **"+ New"** → **"GitHub Repo"**
4. Selecciona tu repositorio
5. Asegúrate de que detecte `package.json` en la raíz

## 🔍 DIAGNÓSTICO RÁPIDO

### Pregunta 1: ¿Tienes NIXPACKS_NODEJS_VERSION = 20?
- **SÍ**: Continúa al paso 2
- **NO**: Agrégala INMEDIATAMENTE

### Pregunta 2: ¿Los logs muestran "Installing nodejs_20"?
- **SÍ**: El problema está en otro lado
- **NO**: Railway no está usando Nixpacks correctamente

### Pregunta 3: ¿El Start Command es "npm start"?
- **SÍ**: Correcto
- **NO**: Cámbialo a "npm start"

## 📞 CONTACTAR SOPORTE RAILWAY
Si después de TODO esto sigue fallando:

1. Ve a [help.railway.app](https://help.railway.app)
2. Haz clic en "Contact Support"
3. Incluye:
   - URL de tu proyecto
   - Este error exacto: `/bin/bash: line 1: npm: command not found`
   - Captura de pantalla de tus variables de entorno
   - Logs completos del deployment

## ⏰ TIEMPO ESTIMADO
- **Agregar variable**: 1 minuto
- **Redespliegue**: 3-5 minutos
- **Verificación**: 1 minuto
- **Total**: 5-7 minutos

---

**🎯 OBJETIVO**: Ver en los logs `✓ Installing nodejs_20` y `✓ Installing npm` sin errores.

**💡 TIP**: Si Railway no instala Node.js automáticamente, el problema está en la configuración del builder o las variables de entorno.