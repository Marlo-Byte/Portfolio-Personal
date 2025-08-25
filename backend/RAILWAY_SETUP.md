# 🚂 Configuración de Railway

## Variables de Entorno Requeridas

En Railway, ve a tu proyecto → **Variables** y agrega:

```
GEMINI_API_KEY=tu_api_key_aqui
```

## Configuración de Red

1. **Puerto**: Railway detecta automáticamente el puerto desde `process.env.PORT`
2. **Dominio**: Se genera automáticamente al hacer deploy

## Verificación

Después de configurar la variable:

1. **Redeploy** el proyecto en Railway
2. **Verificar logs** en Railway Dashboard
3. **Probar endpoint**: `https://tu-dominio.up.railway.app/api/health`

## Troubleshooting

### Error 502 "Application failed to respond"
- ✅ Verificar que `GEMINI_API_KEY` esté configurada
- ✅ Verificar que el proyecto esté en la carpeta `backend/`
- ✅ Verificar logs en Railway Dashboard

### CORS Errors
- ✅ Verificar que el dominio de GitHub Pages esté en la lista de CORS
- ✅ Actual configuración incluye: `https://marianolopez.github.io`

## Comandos de Deploy

```bash
git add .
git commit -m "fix: configuración Railway"
git push origin main
```

Railway hace auto-deploy desde GitHub.