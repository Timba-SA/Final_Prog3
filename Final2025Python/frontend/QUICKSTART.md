# 🚀 Guía Rápida de Inicio - CyberStore Frontend

## ⚡ Quick Start (3 pasos)

### 1️⃣ Instalar dependencias
```powershell
cd frontend
npm install
```

### 2️⃣ Configurar variables de entorno
```powershell
# Copiar el template
Copy-Item .env.example .env.local

# O crear manualmente .env.local con:
# VITE_API_URL=http://localhost:8000
```

### 3️⃣ Iniciar el servidor
```powershell
npm run dev
```

✅ **Listo!** Abre `http://localhost:5173` en tu navegador.

---

## 🔗 Pre-requisitos

Antes de iniciar el frontend, asegúrate de que el backend esté corriendo:

```powershell
# En la raíz del proyecto (carpeta padre)
python -m uvicorn main:app --reload
```

Verifica que el backend responda en: `http://localhost:8000/health_check`

---

## 📦 Comandos Útiles

```powershell
# Desarrollo (con hot reload)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Verificar errores de TypeScript
npm run build
```

---

## 🎯 Rutas de la Aplicación

- **`/`** - Dashboard de Observabilidad
- **`/products`** - Catálogo de Productos
- **`/cart`** - Carrito de Compras (próximamente)

---

## 🐛 Troubleshooting Común

### ❌ Error: "Cannot connect to backend"
**Solución:**
1. Verifica que FastAPI esté corriendo: `http://localhost:8000/docs`
2. Revisa `.env.local` que tenga: `VITE_API_URL=http://localhost:8000`

### ❌ Error: "Module not found"
**Solución:**
```powershell
# Reinstalar dependencias
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
```

### ❌ Error: "Port 5173 already in use"
**Solución:**
```powershell
# Cambiar el puerto en vite.config.ts o detener el proceso
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

## 📁 Archivos Importantes

| Archivo | Descripción |
|---------|------------|
| `src/App.tsx` | Configuración de rutas y providers |
| `src/pages/Dashboard.tsx` | Dashboard con métricas del sistema |
| `src/pages/Products.tsx` | Catálogo de productos |
| `src/store/cartStore.ts` | Estado global del carrito |
| `src/services/api.ts` | Cliente HTTP para el backend |
| `vite.config.ts` | Configuración de Vite |
| `tailwind.config.js` | Tema Cyber-Dark |

---

## 🎨 Ver el Diseño

1. Inicia el servidor: `npm run dev`
2. Abre `http://localhost:5173`
3. Verás:
   - Fondo oscuro Zinc-950
   - Cards con efecto glassmorphism
   - Badges con glow effects
   - Animaciones suaves

---

## 📊 Características Clave

✅ **Dashboard**: Polling real-time cada 2 segundos  
✅ **Productos**: Cards FOMO con badges de stock  
✅ **Carrito**: Persistente en localStorage  
✅ **Animaciones**: Framer Motion para transiciones  
✅ **TypeScript**: Type-safe en todo el código  

---

## 🆘 Soporte

Si tienes problemas, revisa:
1. `README.md` - Documentación completa
2. `http://localhost:8000/docs` - API docs del backend
3. Console del navegador (F12) - Errores de JavaScript

---

**Happy coding! 🚀**
