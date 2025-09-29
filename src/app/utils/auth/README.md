# 🔐 **Guía de Autenticación - Importaciones Correctas**

## 🚨 **IMPORTANTE: Separación SSR/CSR**

Para evitar errores de `next/headers` en componentes cliente, las importaciones están separadas:

---

## 🎯 **Patrones de Importación**

### **🖥️ Server Components (SSR/SSG)**
```typescript
// ✅ CORRECTO - Importación directa para Server Components
import { getUserIdSSR, getTokenSSR } from '@/app/utils/auth/getUserIdSSR';

const ServerComponent = async () => {
  const userId = await getUserIdSSR();
  const token = await getTokenSSR();
  // ...
};
```

### **⚛️ Client Components (CSR)**
```typescript
// ✅ CORRECTO - Importación desde barrel export para Client Components
import { useCurrentUserId, useCurrentUser } from '@/app/utils/auth';

const ClientComponent = () => {
  const userId = useCurrentUserId();
  const user = useCurrentUser();
  // ...
};
```

---

## ❌ **NUNCA Hacer**

```typescript
// ❌ INCORRECTO - No importar SSR utils en Client Components
import { getUserIdSSR } from '@/app/utils/auth/getUserIdSSR'; // ERROR en "use client"

// ❌ INCORRECTO - No usar barrel export para SSR
import { getUserIdSSR } from '@/app/utils/auth'; // Causará error en CSR
```

---

## 📁 **Estructura de Archivos**

```
src/app/utils/auth/
├── index.ts              # Solo Client-Side hooks (CSR)
├── getUserIdSSR.ts       # Solo Server-Side utils (SSR)
└── useCurrentUser.ts     # Solo Client-Side hooks (CSR)
```

---

## 🔧 **Resolución de Problemas**

### **Error: "You're importing a component that needs next/headers"**
- **Causa**: Importar funciones SSR en componentes cliente
- **Solución**: Usar importaciones directas para SSR, barrel export para CSR

### **Error: "Cannot find name 'useUserStore'"**
- **Causa**: Componente no migrado al nuevo patrón
- **Solución**: Usar hooks de `@/app/utils/auth` en lugar de acceso directo al store

---

## ✅ **Checklist de Migración**

- [ ] Server Components usan `import { ... } from '@/app/utils/auth/getUserIdSSR'`
- [ ] Client Components usan `import { ... } from '@/app/utils/auth'`
- [ ] No hay acceso directo a `useUserStore` en componentes
- [ ] Tests actualizados para usar nuevos hooks