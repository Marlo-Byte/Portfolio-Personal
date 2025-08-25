# Backend del Portfolio Personal

Este es el backend del portfolio personal que proporciona la funcionalidad del chatbot con IA usando Google Gemini.

## Configuración Local

1. Instala las dependencias:
```bash
npm install
```

2. Crea un archivo `.env` en la carpeta `backend` con:
```
GEMINI_API_KEY=tu_api_key_de_gemini
PORT=3001
```

3. Ejecuta el servidor:
```bash
npm start
```

## Despliegue en Producción

### Opción 1: Heroku
1. Crea una cuenta en [Heroku](https://heroku.com)
2. Instala Heroku CLI
3. En la carpeta `backend`, ejecuta:
```bash
heroku create tu-app-name
heroku config:set GEMINI_API_KEY=tu_api_key_de_gemini
heroku config:set PORT=3001
git add .
git commit -m "Deploy backend"
git push heroku main
```

### Opción 2: Vercel
1. Crea una cuenta en [Vercel](https://vercel.com)
2. Conecta tu repositorio
3. Configura las variables de entorno:
   - `GEMINI_API_KEY`: Tu API key de Gemini
   - `PORT`: 3001

### Opción 3: Railway
1. Crea una cuenta en [Railway](https://railway.app)
2. Conecta tu repositorio
3. Configura las variables de entorno en el dashboard

## Variables de Entorno Requeridas

- `GEMINI_API_KEY`: API key de Google Gemini (obtener en https://makersuite.google.com/app/apikey)
- `PORT`: Puerto del servidor (por defecto 3001)

## Actualizar Frontend

Después de desplegar el backend, actualiza el archivo `.env.production` del frontend con la URL de tu backend desplegado:

```
VITE_API_URL=https://tu-backend-desplegado.herokuapp.com
```