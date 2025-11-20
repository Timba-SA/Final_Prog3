# 🚀 CyberStore - Frontend React

## 📋 Descripción

SPA (Single Page Application) de E-commerce Enterprise-Grade con diseño **Cyber-Dark**. 
Construida con las últimas tecnologías del ecosistema React para máximo rendimiento y experiencia de usuario.

## 🛠️ Tech Stack

### Core
- **React 18+** - UI Library con Concurrent Features
- **Vite** - Build tool ultra-rápido con HMR
- **TypeScript** - Type safety y mejor DX
- **SWC** - Compilador super rápido (Rust-based)

### Routing & Data
- **React Router v6** - Client-side routing
- **TanStack Query v5** - Server state management & caching
- **Zustand** - Global state management (carrito)

### Estilos & UI
- **Tailwind CSS v3.4+** - Utility-first CSS
- **Shadcn/ui** - Componentes accesibles y customizables
- **Framer Motion** - Animaciones fluidas

### Utilidades
- **Axios** - HTTP client
- **Recharts** - Gráficos y visualizaciones
- **Lucide React** - Iconos modernos
- **Zod** - Schema validation
- **React Hook Form** - Manejo de formularios

## 🎨 Design System

### Tema: Neo-Brutalism Cyber-Dark
- **Background**: Zinc-950 (`#09090b`)
- **Cards**: Zinc-900 con glassmorphism
- **Borders**: Zinc-800 con cyber-glow effects
- **Primary**: Emerald-600 (success states)
- **Destructive**: Rose-600 (errors)
- **Warning**: Amber-500

### Tipografía
- **Sans**: Inter (texto general)
- **Mono**: JetBrains Mono (datos numéricos)

## 📂 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/               # Componentes base (Shadcn)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── badge.tsx
│   │   ├── dashboard/        # Componentes del Dashboard
│   │   │   ├── MetricCard.tsx
│   │   │   ├── PoolStatus.tsx
│   │   │   └── LatencyChart.tsx
│   │   ├── products/         # Componentes de productos
│   │   │   └── ProductCard.tsx
│   │   └── Layout.tsx        # Layout principal
│   │
│   ├── pages/                # Páginas de la app
│   │   ├── Dashboard.tsx     # Observabilidad del sistema
│   │   └── Products.tsx      # Catálogo FOMO
│   │
│   ├── services/             # API services
│   │   └── api.ts
│   │
│   ├── store/                # Zustand stores
│   │   └── cartStore.ts
│   │
│   ├── types/                # TypeScript types
│   │   └── api.ts
│   │
│   ├── lib/                  # Utilidades
│   │   ├── axios.ts
│   │   └── utils.ts
│   │
│   ├── App.tsx               # App principal
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globales
│
├── .env.local                # Variables de entorno
├── .env.example              # Template de env vars
├── vite.config.ts            # Configuración Vite
├── tailwind.config.js        # Configuración Tailwind
├── tsconfig.json             # Configuración TypeScript
└── package.json
```

## 🚀 Instalación y Setup

### 1. Pre-requisitos
- Node.js 18+ instalado
- Backend FastAPI corriendo en `http://localhost:8000`

### 2. Instalación de dependencias

```bash
cd frontend
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Editar `.env.local` si es necesario:
```env
VITE_API_URL=http://localhost:8000
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
# Desarrollo con HMR
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🎯 Funcionalidades Principales

### 1. Dashboard de Observabilidad (`/`)
- **Polling en tiempo real** cada 2 segundos
- **Métricas del sistema**:
  - Estado de la base de datos
  - Latencia de consultas
  - Utilización del connection pool
  - Estado de Redis
  - Uptime del sistema
- **Visualizaciones**:
  - Gráfico de área para latencia histórica
  - Barra de progreso del pool
  - Cards con estados semánticos

### 2. Catálogo de Productos (`/products`)
- **Cards FOMO**:
  - Badge "¡Solo X left!" cuando stock < 5
  - Animación `animate-pulse` en badges de advertencia
  - Efecto `cyber-glow-amber` para productos con bajo stock
- **Carrito persistente** (localStorage con Zustand)
- **Animaciones de entrada** con Framer Motion
- **Estados visuales**:
  - Out of Stock (deshabilitado)
  - Low Stock (warning badge)
  - In Cart (success badge)

## 🔗 Integración con Backend

### Endpoints utilizados:
- `GET /health_check` - Estado del sistema (polling 2s)
- `GET /products` - Lista de productos
- `GET /products/{id}` - Detalle de producto
- `GET /categories` - Lista de categorías
- `GET /orders` - Lista de órdenes

### Configuración de Proxy
Vite está configurado para hacer proxy de `/api` hacia `http://localhost:8000`:

```typescript
// vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  },
}
```

## 🎨 Componentes Clave

### MetricCard
```tsx
<MetricCard
  title="Database Status"
  value="connected"
  icon={Database}
  status="success"
  subtitle="Latency: 15ms"
/>
```

### ProductCard
```tsx
<ProductCard 
  product={product} 
  index={0} 
/>
```

### Badge Variants
```tsx
<Badge variant="success">OK</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Info</Badge>
```

## 🔧 Configuración Avanzada

### Path Aliases
Configurado en `vite.config.ts` y `tsconfig.json`:
```typescript
import { Component } from '@/components/Component';
import { api } from '@/services/api';
```

### TanStack Query
Cache configurado en `App.tsx`:
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Zustand Persistence
El carrito se persiste automáticamente en `localStorage`:
```typescript
persist(
  (set, get) => ({ /* store */ }),
  { name: 'cart-storage' }
)
```

## 🚨 Troubleshooting

### Backend no responde
- Verificar que FastAPI esté corriendo: `http://localhost:8000/docs`
- Revisar la variable `VITE_API_URL` en `.env.local`

### Errores de TypeScript
- Ejecutar: `npm run build` para ver errores de compilación
- Verificar aliases en `tsconfig.app.json`

### Componentes de Shadcn no funcionan
- Verificar que `tailwind.config.js` incluya los paths correctos
- Confirmar que `@/lib/utils.ts` exista con la función `cn()`

## 📚 Recursos Adicionales

- [Vite Documentation](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

## 🎯 Próximas Mejoras

- [ ] Autenticación con JWT
- [ ] Página de checkout completa
- [ ] Filtros y búsqueda de productos
- [ ] Paginación de productos
- [ ] Modo claro/oscuro toggle
- [ ] PWA support
- [ ] Tests con Vitest
- [ ] Storybook para componentes

## 📄 Licencia

Este proyecto es parte del trabajo final de Programación - 3er Semestre.

---

**Desarrollado con ❤️ usando React + FastAPI**

