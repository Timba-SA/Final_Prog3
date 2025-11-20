# 🔗 Integración Frontend-Backend

## 📋 Checklist de Integración

### 1. Backend (FastAPI) - Puerto 8000

#### Verificar que el backend esté corriendo:
```powershell
# En la raíz del proyecto
python -m uvicorn main:app --reload
```

#### Probar endpoint de salud:
```powershell
# PowerShell
Invoke-WebRequest http://localhost:8000/health_check

# O abrir en navegador:
# http://localhost:8000/docs
```

---

### 2. Frontend (React) - Puerto 5173

#### Configurar variables de entorno:
```powershell
cd frontend
Copy-Item .env.example .env.local
```

#### Iniciar el servidor de desarrollo:
```powershell
npm run dev
```

---

## 🔄 Flujo de Datos

```
┌─────────────┐         HTTP         ┌─────────────┐
│   React     │ ───────────────────> │   FastAPI   │
│  (5173)     │ <─────────────────── │   (8000)    │
└─────────────┘      JSON/REST       └─────────────┘
      │                                      │
      │                                      │
   Zustand                              PostgreSQL
  (Estado)                               (Datos)
```

---

## 📡 Endpoints Consumidos

### Health Check (Dashboard)
```typescript
GET /health_check
Polling: cada 2 segundos
```

**Respuesta esperada:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-20T...",
  "database": {
    "status": "connected",
    "latency_ms": 15.5,
    "pool_size": 10,
    "pool_in_use": 2,
    "utilization_percent": 20.0
  },
  "redis": {
    "status": "connected",
    "latency_ms": 5.2
  },
  "uptime_seconds": 3600,
  "version": "1.0.0"
}
```

---

### Products (Catálogo)
```typescript
GET /products
```

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "name": "Producto 1",
    "description": "Descripción del producto",
    "price": 99.99,
    "stock": 10,
    "category_id": 1,
    "is_active": true,
    "created_at": "2025-11-20T...",
    "updated_at": "2025-11-20T..."
  }
]
```

---

## 🛠️ Configuración CORS en Backend

Si experimentas errores CORS, verifica que el backend tenga configurado:

```python
# main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🧪 Testing de Integración

### 1. Verificar Backend
```powershell
# Desde PowerShell
Invoke-RestMethod -Uri http://localhost:8000/health_check | ConvertTo-Json
```

### 2. Verificar Frontend puede alcanzar Backend
```javascript
// Desde la consola del navegador (F12)
fetch('http://localhost:8000/health_check')
  .then(r => r.json())
  .then(console.log)
```

---

## 🐛 Troubleshooting

### Error: "Network Error" en el frontend

**Posibles causas:**

1. **Backend no está corriendo**
   ```powershell
   # Verificar procesos en puerto 8000
   netstat -ano | findstr :8000
   ```

2. **CORS no configurado**
   - Agregar middleware CORS en FastAPI
   - Permitir origen: `http://localhost:5173`

3. **URL incorrecta en .env.local**
   ```env
   # Debe ser exactamente:
   VITE_API_URL=http://localhost:8000
   ```

---

### Error: "Connection Refused"

**Solución:**
```powershell
# 1. Detener todos los procesos
taskkill /F /IM python.exe
taskkill /F /IM node.exe

# 2. Reiniciar backend
python -m uvicorn main:app --reload

# 3. Reiniciar frontend
cd frontend
npm run dev
```

---

### Error: Datos no se actualizan

**Verificar:**
1. **React Query cache**: Puede estar sirviendo datos cacheados
2. **Backend actualizado**: Confirmar que los datos en DB cambiaron
3. **Polling activo**: Dashboard usa `refetchInterval: 2000`

**Limpiar cache:**
```javascript
// En consola del navegador
localStorage.clear()
location.reload()
```

---

## 📊 Monitoreo de Requests

### En el Navegador (F12)

1. Abrir **DevTools** (F12)
2. Ir a la pestaña **Network**
3. Filtrar por **XHR** o **Fetch**
4. Observar:
   - Request URL
   - Status Code
   - Response Time
   - Payload

### Requests Esperados

**Dashboard (`/`):**
- `GET /health_check` cada 2 segundos
- Status: 200 OK
- Response time: < 100ms

**Products (`/products`):**
- `GET /products` una vez (luego cacheado)
- Status: 200 OK
- Response time: < 200ms

---

## 🔐 Próximos Pasos: Autenticación

Para implementar autenticación:

### Backend (FastAPI)
```python
# Agregar endpoints
POST /auth/login
POST /auth/register
GET /auth/me
```

### Frontend (React)
```typescript
// Agregar interceptor en axios.ts
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 📱 Despliegue

### Frontend (Vercel/Netlify)
```env
# Production .env
VITE_API_URL=https://api.tudominio.com
```

### Backend (Railway/Render)
```python
# Actualizar CORS para producción
allow_origins=["https://tudominio.com"]
```

---

## ✅ Checklist de Integración Completa

- [ ] Backend corre en puerto 8000
- [ ] `/health_check` responde 200 OK
- [ ] `/products` devuelve array de productos
- [ ] CORS configurado correctamente
- [ ] Frontend corre en puerto 5173
- [ ] `.env.local` tiene `VITE_API_URL` correcto
- [ ] Dashboard muestra métricas en tiempo real
- [ ] Catálogo carga productos correctamente
- [ ] No hay errores en consola del navegador
- [ ] Network tab muestra requests exitosos

---

**¡Todo listo para desarrollar! 🚀**
