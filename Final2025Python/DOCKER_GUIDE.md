# 🐳 Guía Docker - CyberStore Full Stack

## 📋 Descripción

Esta guía te muestra cómo levantar toda la aplicación (Backend + Frontend + Base de Datos + Redis) usando Docker Compose.

---

## 🏗️ Arquitectura de Contenedores

```
┌─────────────────────────────────────────────────────────────┐
│                     Docker Network                          │
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Frontend   │───▶│   Backend    │───▶│  PostgreSQL  │ │
│  │   (Nginx)    │    │   (FastAPI)  │    │              │ │
│  │   Port 3000  │    │   Port 8000  │    │   Port 5432  │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│         │                    │                              │
│         │                    └────────────┐                 │
│         │                                 ▼                 │
│         │                         ┌──────────────┐          │
│         │                         │    Redis     │          │
│         │                         │  Port 6379   │          │
│         │                         └──────────────┘          │
│         │                                                   │
│         └───────────────────────────────────────────────────┤
│                      Proxy /api → backend:8000              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Inicio Rápido

### 1️⃣ Levantar todos los servicios

```powershell
# Desde la raíz del proyecto
docker-compose up --build
```

**Esto levantará:**
- ✅ PostgreSQL en puerto 5432
- ✅ Redis en puerto 6379
- ✅ Backend (FastAPI) en puerto 8000
- ✅ Frontend (React + Nginx) en puerto 3000

### 2️⃣ Acceder a la aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Redoc**: http://localhost:8000/redoc

---

## 📦 Comandos Útiles

### Iniciar servicios en background
```powershell
docker-compose up -d
```

### Ver logs de todos los servicios
```powershell
docker-compose logs -f
```

### Ver logs de un servicio específico
```powershell
# Frontend
docker-compose logs -f frontend

# Backend
docker-compose logs -f backend

# PostgreSQL
docker-compose logs -f postgres

# Redis
docker-compose logs -f redis
```

### Detener servicios
```powershell
docker-compose down
```

### Detener y eliminar volúmenes (limpieza completa)
```powershell
docker-compose down -v
```

### Reiniciar un servicio específico
```powershell
docker-compose restart frontend
docker-compose restart backend
```

### Ver estado de los contenedores
```powershell
docker-compose ps
```

### Reconstruir solo un servicio
```powershell
docker-compose up --build --no-deps frontend
docker-compose up --build --no-deps backend
```

### Ejecutar comandos dentro de un contenedor
```powershell
# Shell en backend
docker-compose exec backend sh

# Shell en frontend (nginx)
docker-compose exec frontend sh

# PostgreSQL client
docker-compose exec postgres psql -U postgres

# Redis CLI
docker-compose exec redis redis-cli
```

---

## 🔧 Configuración

### Variables de Entorno

#### Backend (en docker-compose.yaml)
```yaml
POSTGRES_HOST: postgres
POSTGRES_PORT: 5432
POSTGRES_DB: postgres
POSTGRES_USER: postgres
POSTGRES_PASSWORD: postgres
REDIS_HOST: redis
REDIS_PORT: 6379
CORS_ORIGINS: "http://localhost:3000,http://localhost:5173"
```

#### Frontend (.env.production)
```env
VITE_API_URL=/api
```

---

## 🌐 Routing y Proxy

El frontend está configurado con Nginx para:

1. **Servir archivos estáticos** de React
2. **Proxy /api/** hacia el backend (FastAPI)
3. **React Router** - todas las rutas van a index.html

### Ejemplo de Request:
```
Frontend Request:  http://localhost:3000/api/products
                        ↓
Nginx Proxy:       http://backend:8000/products
                        ↓
FastAPI:          Procesa y responde
```

---

## 🔍 Health Checks

Todos los servicios tienen health checks configurados:

### Verificar salud de servicios
```powershell
docker-compose ps
```

Deberías ver algo como:
```
NAME                        STATUS
ecommerce_backend_dev       Up (healthy)
ecommerce_frontend_dev      Up (healthy)
ecommerce_postgres_dev      Up (healthy)
ecommerce_redis_dev         Up (healthy)
```

### Health Check Endpoints
- **Backend**: http://localhost:8000/health_check
- **Frontend**: http://localhost:3000 (respuesta 200 OK)
- **PostgreSQL**: `pg_isready -U postgres`
- **Redis**: `redis-cli ping`

---

## 🐛 Troubleshooting

### Error: "Port already in use"

**Solución 1 - Cambiar puerto en docker-compose.yaml:**
```yaml
frontend:
  ports:
    - "3001:80"  # Cambiar 3000 a 3001

backend:
  ports:
    - "8001:8000"  # Cambiar 8000 a 8001
```

**Solución 2 - Detener proceso que usa el puerto:**
```powershell
# Ver qué proceso usa el puerto 3000
netstat -ano | findstr :3000

# Matar proceso
taskkill /PID <PID> /F
```

---

### Error: "Cannot connect to backend"

**Verificar que el backend esté healthy:**
```powershell
docker-compose ps backend
docker-compose logs backend
```

**Probar el backend directamente:**
```powershell
Invoke-WebRequest http://localhost:8000/health_check
```

---

### Error: "Database connection failed"

**Verificar PostgreSQL:**
```powershell
docker-compose logs postgres
docker-compose exec postgres psql -U postgres -c "SELECT 1"
```

**Recrear base de datos:**
```powershell
docker-compose down -v
docker-compose up --build
```

---

### Frontend no carga o muestra página en blanco

**Verificar Nginx:**
```powershell
docker-compose logs frontend
docker-compose exec frontend cat /etc/nginx/conf.d/default.conf
```

**Verificar build:**
```powershell
docker-compose exec frontend ls -la /usr/share/nginx/html
```

**Reconstruir frontend:**
```powershell
docker-compose up --build --no-deps frontend
```

---

### Error: "Redis connection refused"

**Verificar Redis:**
```powershell
docker-compose logs redis
docker-compose exec redis redis-cli ping
```

**Limpiar datos de Redis:**
```powershell
docker-compose exec redis redis-cli FLUSHALL
```

---

## 📊 Monitoreo

### Ver uso de recursos
```powershell
docker stats
```

### Ver espacio usado por volúmenes
```powershell
docker system df -v
```

### Limpiar recursos no usados
```powershell
# Eliminar contenedores detenidos
docker container prune

# Eliminar imágenes no usadas
docker image prune -a

# Eliminar volúmenes no usados
docker volume prune

# Limpieza completa (cuidado!)
docker system prune -a --volumes
```

---

## 🔄 Actualizar Código

### Hot Reload (Desarrollo)

**Backend:**
- El código se monta como volumen
- Uvicorn detecta cambios automáticamente
- No necesitas rebuild

**Frontend:**
- Necesitas rebuild para ver cambios
```powershell
docker-compose up --build --no-deps frontend
```

### Aplicar cambios permanentes
```powershell
# 1. Detener servicios
docker-compose down

# 2. Reconstruir todo
docker-compose up --build

# O reconstruir solo lo que cambió
docker-compose up --build --no-deps frontend
docker-compose up --build --no-deps backend
```

---

## 🚀 Despliegue a Producción

Para producción, usa `docker-compose.production.yaml`:

```powershell
docker-compose -f docker-compose.production.yaml up --build -d
```

**Diferencias en producción:**
- Sin volúmenes montados
- Variables de entorno seguras
- Optimizaciones de build
- Límites de recursos

---

## 📝 Comandos de Base de Datos

### Crear backup
```powershell
docker-compose exec postgres pg_dump -U postgres postgres > backup.sql
```

### Restaurar backup
```powershell
Get-Content backup.sql | docker-compose exec -T postgres psql -U postgres
```

### Ejecutar migraciones (Alembic)
```powershell
docker-compose exec backend alembic upgrade head
```

### Ver tablas
```powershell
docker-compose exec postgres psql -U postgres -c "\dt"
```

---

## ✅ Checklist de Verificación

Después de levantar los servicios, verifica:

- [ ] `docker-compose ps` muestra todos los servicios como "healthy"
- [ ] http://localhost:3000 carga el frontend
- [ ] http://localhost:8000/docs muestra la documentación de la API
- [ ] http://localhost:8000/health_check responde con status 200
- [ ] Dashboard del frontend muestra métricas en tiempo real
- [ ] Catálogo de productos carga correctamente
- [ ] No hay errores en los logs: `docker-compose logs`

---

## 🎯 Flujo de Trabajo Recomendado

### Desarrollo Diario
```powershell
# 1. Iniciar servicios
docker-compose up -d

# 2. Ver logs
docker-compose logs -f

# 3. Trabajar en tu código...

# 4. Si cambias frontend, rebuild
docker-compose up --build --no-deps frontend

# 5. Al terminar, detener
docker-compose down
```

### Reset Completo
```powershell
# Limpieza total (elimina datos)
docker-compose down -v
docker image prune -a

# Iniciar desde cero
docker-compose up --build
```

---

## 📚 Recursos Adicionales

- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx Configuration](https://nginx.org/en/docs/)

---

## 🎉 ¡Todo Listo!

Ahora tienes toda la aplicación corriendo en Docker. Para iniciar:

```powershell
docker-compose up --build
```

Luego abre: **http://localhost:3000** 🚀
