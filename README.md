# 🧠 TrivIAndo - Trivia Inteligente con IA

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-teal.svg)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue.svg)](https://www.docker.com/)

> **Una plataforma de trivia inteligente que transforma el aprendizaje en una experiencia gamificada usando Inteligencia Artificial**

![TrivIAndo Banner](public/logo-triviando.png)

---

## 🌟 Visión General

**TrivIAndo** es una aplicación web innovadora que revoluciona la forma de estudiar y aprender mediante la gamificación del conocimiento. Utilizando algoritmos de Inteligencia Artificial avanzados, la plataforma genera automáticamente preguntas personalizadas sobre cualquier tema que el usuario desee explorar, creando una experiencia de aprendizaje única, interactiva y altamente efectiva.

### 🎯 Misión

Democratizar el acceso al conocimiento a través de una plataforma que convierte el estudio tradicional en una experiencia divertida, competitiva y altamente personalizada, fomentando hábitos de aprendizaje sostenibles.

---

## 🚀 Características Principales

### 🤖 **Generación Inteligente de Contenido**

- **IA Generativa**: Creación automática de preguntas contextualizadas usando modelos de lenguaje avanzados
- **Personalización Adaptativa**: Contenido que se ajusta al nivel y estilo de aprendizaje del usuario
- **Diversidad Temática**: Soporte para cualquier área de conocimiento

### 🎮 **Experiencia Gamificada**

- **Sistema de Puntuación**: Algoritmo inteligente que premia la consistencia y mejora
- **Rankings Dinámicos**: Leaderboards por temática que fomentan la competencia saludable
- **Feedback Inmediato**: Explicaciones detalladas para respuestas incorrectas con IA
- **Progresión Visual**: Estadísticas avanzadas y métricas de rendimiento

### 🔧 **Funcionalidades Avanzadas**

- **Modo "Aprendamos Juntos"**: Explicaciones generadas por IA para respuestas incorrectas
- **Sistema de Feedback**: Mejora continua del algoritmo basada en interacciones del usuario
- **Responsive Design**: Experiencia optimizada para todos los dispositivos
- **Gestión de Sesiones**: Sistema robusto de autenticación y persistencia

---

## 🏗️ Arquitectura del Sistema

### **Stack Tecnológico**

#### **Frontend (Este Repositorio)**

- **Framework**: Next.js 15 con App Router
- **UI/UX**: React 18 + TypeScript + Tailwind CSS
- **Animaciones**: Framer Motion para micro-interacciones
- **Estado Global**: Zustand para gestión de estado
- **Testing**: Jest + React Testing Library

#### **Backend & IA**

- **API**: Java Spring Boot con arquitectura REST
- **Base de Datos**:
  - **SQL**: PostgreSQL para datos estructurados
  - **NoSQL**: MongoDB para contenido generado por IA
- **IA & ML**:
  - **Nomic Embeddings** para procesamiento semántico
  - **Modelos de Lenguaje** para generación de preguntas
- **Infraestructura**: Docker + Microservicios

---

# 💻 Frontend - Especificaciones Técnicas

## 🛠️ Tecnologías y Herramientas

### **Core Technologies**

- **Next.js 15**: Framework React con App Router y SSR
- **TypeScript 5.0**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework de utilidades para diseño responsivo
- **Framer Motion**: Librería de animaciones para React

### **Estado y Datos**

- **Zustand**: Gestión de estado global minimalista
- **React Hook Form**: Manejo eficiente de formularios

### **Calidad y Testing**

- **ESLint + Prettier**: Linting y formateo de código
- **Jest**: Framework de testing unitario
- **React Testing Library**: Testing de componentes React

---

## 🎨 Design System Unificado

### **🌟 Nuevas Optimizaciones Implementadas**

#### **Sistema de Colores Centralizado**

```typescript
// utils/designSystem.ts - Colores de la marca unificados
export const COLORS = {
  brand: {
    teal: '#14b8a6',
    cyan: '#06b6d4',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
  },
};
```

#### **Botones Optimizados**

- ✅ **Primario**: Gradiente teal con texto blanco (mejorada legibilidad)
- ✅ **Secundario**: Efecto glass con backdrop blur
- ✅ **Estados**: Hover, loading, disabled con animaciones fluidas

#### **Cards con Glass Effect**

- ✅ **Backdrop blur** para efecto moderno
- ✅ **Bordes translúcidos** que se integran con el gradiente de fondo
- ✅ **Hover animations** consistentes en toda la app

#### **Sistema de Animaciones Unificado**

```typescript
// utils/animations.ts - Animaciones reutilizables
import { AnimatedContainer } from '@/components/AnimatedContainer';

// Uso simple y consistente
<AnimatedContainer animation="slideUp" delay={0.2}>
  <Card>Contenido animado</Card>
</AnimatedContainer>;
```

### **Animaciones Disponibles**

- **Entrada**: fade, slideUp, slideDown, slideLeft, slideRight, scale, bounce
- **Lista**: stagger animations para elementos múltiples
- **Hover**: scale, glow, bounce effects
- **Página**: transiciones fluidas entre rutas

---

## 🔧 Instalación y Desarrollo

### **Inicio Rápido**

```bash
# Con Docker (Recomendado)
docker-compose up --build

# Sin Docker
npm install
npm run dev
```

### **Scripts Disponibles**

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción

# Testing
npm run test         # Tests unitarios
npm run test:watch   # Tests en modo watch
npm run test:coverage # Cobertura de tests

# Calidad de código
npm run lint         # ESLint
npm run lint:fix     # Auto-fix de ESLint
npm run format       # Prettier formatting
```

---

## 📁 Estructura del Proyecto Optimizada

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── (pages)/           # Rutas agrupadas por funcionalidad
│   ├── components/        # Componentes reutilizables
│   │   ├── AnimatedContainer.tsx  # 🆕 Wrapper de animaciones
│   │   └── ui/           # Design System componentes
│   ├── services/         # Capa de servicios API
│   ├── stores/           # Estado global (Zustand)
│   └── middleware.ts     # Middleware de autenticación
├── utils/                # 🆕 Utilidades centralizadas
│   ├── animations.ts     # 🆕 Sistema de animaciones unificado
│   ├── designSystem.ts   # 🆕 Constantes de diseño
│   ├── constants.ts      # 🆕 Textos y configuración
│   └── playSound.ts      # 🆕 Sistema de sonidos mejorado
```

---

## 🎮 Características de la Optimización

### **🔧 Mejoras Implementadas**

#### **1. Design System Centralizado**

- ✅ Colores, tipografía y espaciado unificados
- ✅ Tokens de diseño reutilizables
- ✅ Consistencia visual en toda la aplicación

#### **2. Sistema de Animaciones Modular**

- ✅ Animaciones reutilizables y configurables
- ✅ Performance optimizado con Framer Motion
- ✅ Fácil mantenimiento y extensión

#### **3. Gestión de Sonidos Mejorada**

- ✅ Cache de audio para mejor rendimiento
- ✅ Tipos de sonido centralizados
- ✅ Control de volumen global

#### **4. Constantes y Textos Unificados**

- ✅ Todos los textos en un solo lugar
- ✅ Fácil localización futura
- ✅ Configuración centralizada

---

## 🚀 Performance y Buenas Prácticas

### **Optimizaciones de Rendimiento**

- **Code Splitting**: Lazy loading automático
- **Image Optimization**: Next.js Image component
- **Cache Strategy**: Service Worker para assets
- **Bundle Size**: Análisis y optimización continua

### **Estándares de Código**

- **TypeScript Strict**: Tipado estricto en todo el proyecto
- **ESLint**: Reglas de calidad estrictas
- **Prettier**: Formateo consistente
- **Conventional Commits**: Historial limpio y semántico

---

## 🤝 Flujo de Desarrollo y Convenciones

### **Convención de Ramas**

```bash
TIPO/SCRUM-N°TAREA-BREVE-DESCRIPCION
```

✅ **Ejemplo**: `FEATURE/SCRUM-123-sistema-animaciones`

### **Convención de Commits**

```bash
[FEATURE] → Nueva funcionalidad
[FIX] → Corrección de errores
[IMPROVEMENT] → Mejoras y optimizaciones
[DOCS] → Documentación
[REFACTOR] → Refactorización de código
[TEST] → Tests y pruebas
```

### **Flujo de Trabajo**

```bash
# Crear nueva feature desde develop
git checkout develop
git checkout -b FEATURE/SCRUM-123-nueva-funcionalidad

# Desarrollo con commits descriptivos
git commit -m "[FEATURE] Implementar sistema de animaciones unificado"

# Pull Request hacia develop
git push origin FEATURE/SCRUM-123-nueva-funcionalidad
```

---

## 📈 Roadmap y Próximas Mejoras

### **Optimizaciones Completadas ✅**

- [x] Design System unificado con tokens centralizados
- [x] Sistema de animaciones modular y reutilizable
- [x] Botones optimizados con gradiente teal y texto blanco
- [x] Cards con Glass Effect y backdrop blur
- [x] Sistema de sonidos mejorado con cache
- [x] Constantes y textos centralizados
- [x] Background con gradiente teal fijo en toda la app

### **Próximas Funcionalidades 🚀**

- [ ] **Modo Multijugador**: Competencias en tiempo real
- [ ] **PWA Completo**: Funcionalidad offline
- [ ] **Notificaciones Push**: Recordatorios personalizados
- [ ] **Analytics Avanzados**: Dashboard de métricas
- [ ] **Localización**: Soporte multi-idioma

---

## 🏆 Equipo de Desarrollo

**Grupo Nullpointer - UNSAM 2025**

| Desarrollador         | Rol                  | GitHub                                                   |
| --------------------- | -------------------- | -------------------------------------------------------- |
| **Facundo Barneche**  | Frontend Lead        | [@facubarneche](https://github.com/facubarneche)         |
| **Julian Gibelli**    | Backend Developer    | [@juliangibelli](https://github.com/juliangibelli)       |
| **Alan Guarino**      | Full Stack Developer | [@alanguarino](https://github.com/alanguarino)           |
| **Juan Caceffo**      | DevOps Engineer      | [@juancaceffo](https://github.com/juancaceffo)           |
| **Federico Serafini** | UI/UX Developer      | [@federicoserafini](https://github.com/federicoserafini) |
| **Facundo Sacchi**    | QA Engineer          | [@facundosacchi](https://github.com/facundosacchi)       |

### **Supervisores Académicos**

- **Pablo Andrés Núñez Monzon**
- **Mariano Cristobo**

---

<div align="center">

## 🎓 **Proyecto de Software – TPI**

**Universidad Nacional de San Martín (UNSAM) - 2025**

[![UNSAM](https://img.shields.io/badge/UNSAM-Universidad%20Nacional%20de%20San%20Martín-blue.svg)](https://www.unsam.edu.ar/)

---

### 🌟 **Optimizaciones Implementadas**

✅ **Design System Unificado**: Colores, tipografía y espaciado centralizados  
✅ **Animaciones Consistentes**: Sistema modular reutilizable  
✅ **Botones Mejorados**: Gradiente teal con texto blanco optimizado  
✅ **Glass Effect**: Cards modernas con backdrop blur  
✅ **Sound System**: Gestión centralizada y optimizada  
✅ **Constants**: Textos y configuración unificados  
✅ **Background**: Gradiente teal fijo en toda la aplicación  
✅ **Performance**: Code splitting y optimizaciones avanzadas

_Transformando la educación a través de la tecnología y la innovación_ 🚀

## </div>

## 🚀 Características Principales

### 🤖 **Generación Inteligente de Contenido**

- **IA Generativa**: Creación automática de preguntas contextualizadas usando modelos de lenguaje avanzados
- **Personalización Adaptativa**: Contenido que se ajusta al nivel y estilo de aprendizaje del usuario
- **Diversidad Temática**: Soporte para cualquier área de conocimiento

### 🎮 **Experiencia Gamificada**

- **Sistema de Puntuación**: Algoritmo inteligente que premia la consistencia y mejora
- **Rankings Dinámicos**: Leaderboards por temática que fomentan la competencia saludable
- **Feedback Inmediato**: Explicaciones detalladas para respuestas incorrectas con IA
- **Progresión Visual**: Estadísticas avanzadas y métricas de rendimiento

### 🔧 **Funcionalidades Avanzadas**

- **Modo "Aprendamos Juntos"**: Explicaciones generadas por IA para respuestas incorrectas
- **Sistema de Feedback**: Mejora continua del algoritmo basada en interacciones del usuario
- **Responsive Design**: Experiencia optimizada para todos los dispositivos
- **Gestión de Sesiones**: Sistema robusto de autenticación y persistencia

---

## 🏗️ Arquitectura del Sistema

### **Stack Tecnológico**

#### **Frontend (Este Repositorio)**

- **Framework**: Next.js 15 con App Router
- **UI/UX**: React 18 + TypeScript + Tailwind CSS
- **Animaciones**: Framer Motion para micro-interacciones
- **Estado Global**: Zustand para gestión de estado
- **Testing**: Jest + React Testing Library

#### **Backend & IA**

- **API**: Java Spring Boot con arquitectura REST
- **Base de Datos**:
  - **SQL**: PostgreSQL para datos estructurados
  - **NoSQL**: MongoDB para contenido generado por IA
- **IA & ML**:
  - **Nomic Embeddings** para procesamiento semántico
  - **Modelos de Lenguaje** para generación de preguntas
- **Infraestructura**: Docker + Microservicios

---

# 💻 Frontend - Especificaciones Técnicas

## 🛠️ Tecnologías y Herramientas

### **Core Technologies**

- **Next.js 15**: Framework React con App Router y SSR
- **TypeScript 5.0**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework de utilidades para diseño responsivo
- **Framer Motion**: Librería de animaciones para React

### **Estado y Datos**

- **Zustand**: Gestión de estado global minimalista
- **React Hook Form**: Manejo eficiente de formularios

### **Calidad y Testing**

- **ESLint + Prettier**: Linting y formateo de código
- **Jest**: Framework de testing unitario
- **React Testing Library**: Testing de componentes React

---

## 🎨 Design System Unificado

### **🌟 Nuevas Optimizaciones Implementadas**

#### **Sistema de Colores Centralizado**

```typescript
// utils/designSystem.ts - Colores de la marca unificados
export const COLORS = {
  brand: {
    teal: '#14b8a6',
    cyan: '#06b6d4',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
  },
};
```

#### **Botones Optimizados**

- ✅ **Primario**: Gradiente teal con texto blanco (mejorada legibilidad)
- ✅ **Secundario**: Efecto glass con backdrop blur
- ✅ **Estados**: Hover, loading, disabled con animaciones fluidas

#### **Cards con Glass Effect**

- ✅ **Backdrop blur** para efecto moderno
- ✅ **Bordes translúcidos** que se integran con el gradiente de fondo
- ✅ **Hover animations** consistentes en toda la app

#### **Sistema de Animaciones Unificado**

```typescript
// utils/animations.ts - Animaciones reutilizables
import { AnimatedContainer } from '@/components/AnimatedContainer';

// Uso simple y consistente
<AnimatedContainer animation="slideUp" delay={0.2}>
  <Card>Contenido animado</Card>
</AnimatedContainer>;
```

### **Animaciones Disponibles**

- **Entrada**: fade, slideUp, slideDown, slideLeft, slideRight, scale, bounce
- **Lista**: stagger animations para elementos múltiples
- **Hover**: scale, glow, bounce effects
- **Página**: transiciones fluidas entre rutas

---

## 🔧 Instalación y Desarrollo

### **Inicio Rápido**

```bash
# Con Docker (Recomendado)
docker-compose up --build

# Sin Docker
npm install
npm run dev
```

### **Scripts Disponibles**

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción

# Testing
npm run test         # Tests unitarios
npm run test:watch   # Tests en modo watch
npm run test:coverage # Cobertura de tests

# Calidad de código
npm run lint         # ESLint
npm run lint:fix     # Auto-fix de ESLint
npm run format       # Prettier formatting
```

---

## 📁 Estructura del Proyecto Optimizada

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── (pages)/           # Rutas agrupadas por funcionalidad
│   ├── components/        # Componentes reutilizables
│   │   ├── AnimatedContainer.tsx  # 🆕 Wrapper de animaciones
│   │   └── ui/           # Design System componentes
│   ├── services/         # Capa de servicios API
│   ├── stores/           # Estado global (Zustand)
│   └── middleware.ts     # Middleware de autenticación
├── utils/                # 🆕 Utilidades centralizadas
│   ├── animations.ts     # 🆕 Sistema de animaciones unificado
│   ├── designSystem.ts   # 🆕 Constantes de diseño
│   ├── constants.ts      # 🆕 Textos y configuración
│   └── playSound.ts      # 🆕 Sistema de sonidos mejorado
```

---

## 🎮 Características de la Optimización

### **🔧 Mejoras Implementadas**

#### **1. Design System Centralizado**

- ✅ Colores, tipografía y espaciado unificados
- ✅ Tokens de diseño reutilizables
- ✅ Consistencia visual en toda la aplicación

#### **2. Sistema de Animaciones Modular**

- ✅ Animaciones reutilizables y configurables
- ✅ Performance optimizado con Framer Motion
- ✅ Fácil mantenimiento y extensión

#### **3. Gestión de Sonidos Mejorada**

- ✅ Cache de audio para mejor rendimiento
- ✅ Tipos de sonido centralizados
- ✅ Control de volumen global

#### **4. Constantes y Textos Unificados**

- ✅ Todos los textos en un solo lugar
- ✅ Fácil localización futura
- ✅ Configuración centralizada

---

## 🚀 Performance y Buenas Prácticas

### **Optimizaciones de Rendimiento**

- **Code Splitting**: Lazy loading automático
- **Image Optimization**: Next.js Image component
- **Cache Strategy**: Service Worker para assets
- **Bundle Size**: Análisis y optimización continua

### **Estándares de Código**

- **TypeScript Strict**: Tipado estricto en todo el proyecto
- **ESLint**: Reglas de calidad estrictas
- **Prettier**: Formateo consistente
- **Conventional Commits**: Historial limpio y semántico

Para mantener la claridad en el historial de commits, utilizaremos los siguientes prefijos:

[FEATURE] → Implementación de nueva funcionalidad

[FIX] → Corrección de errores

[IMPROVEMENT] → Tareas de mantenimiento, mejoras de rendimiento o actualizaciones de dependencias

[DOCS] → Actualizaciones de documentación

[REFACTOR] → Mejoras en el código que no cambian la funcionalidad

[TEST] → Adición o mejora de pruebas

[HOTFIX] → Corrección en producción

## ✅ Ejemplos de Mensajes de Commit:

git commit -m "[FEATURE] Implementar autenticación de usuario" git commit -m "[FIX] Resolver problema con validación de inicio de sesión" git commit -m "[IMPROVEMENT] Actualizar dependencias a las versiones más recientes" Flujo de Trabajo en Git (Git Flow)

Seguiremos un enfoque estructurado de Git Flow para mantener nuestro proceso de desarrollo organizado y fluido.

- Desarrollo de Funcionalidades

  Crear una nueva rama desde develop usando la convención de nombres de ramas.

  Trabajar en la funcionalidad, haciendo commits con el formato de mensaje adecuado.

- Pull Request y Revisión

  Una vez la funcionalidad esté lista, se abre un Pull Request (PR) hacia develop.

  Un miembro del equipo revisa el código y proporciona retroalimentación.

- Merge y Despliegue

  Después de la aprobación, el autor del pull request fusiona la rama en develop

  Una vez que la rama develop esté lista y validada para fusionar a main con una nueva versión se debe crear un tag para marcar esta versión específica.

  El nombre del tag debe seguir la convención vX.Y.Z, (por ejemplo, v1.2.0).

  Los lanzamientos de producción se gestionan desde la rama main.

## ✅ Ejemplo de Comandos de Flujo de Trabajo:

git checkout develop git pull origin develop git checkout -b DOCS/SCRUM-9-definir-convencion

Trabajar en la funcionalidad...

git commit -m "[DOCS] Definicion de convencion" git push origin DOCS/SCRUM-9-definir-convencion

Abrir un PR para fusionar en develop

Una vez listo para finalizar una versión

git tag -a v1.2.0 -m "Release versión 1.2.0" git push origin v1.2.0

alt text
Tipos de Versiones (Major/Minor/Patch)

Se debe incrementar el número de versión según el tipo de cambios que se hayan realizado:

Major (Mayor): Cambios incompatibles que rompen la compatibilidad con versiones anteriores.

    Ejemplo: v1.0.0 a v2.0.0.

Minor (Menor): Funcionalidades nuevas compatibles con versiones anteriores.

    Ejemplo: v1.0.0 a v1.1.0.

Patch (Parche): Corrección de errores y mejoras menores compatibles con la versión actual.

    Ejemplo: v1.0.0 a v1.0.1.

## Tablero de Gestión de Tareas (JIRA)

Para hacer un seguimiento de nuestro progreso de desarrollo, usamos JIRA con un flujo de trabajo estructurado que consta de cinco estados clave:

- To-Do 📝 – La tarea ha sido creada y está lista para ser trabajada.

- In Progress 🚧 – La tarea está siendo desarrollada activamente.

- Code Review 🔍 – Se ha enviado un pull request (PR) y está esperando revisión (Aprobable solo por el encargado de ver los PRs).

- Critic Code Review rescue worker’s helmet - Se ha enviado un pull request (PR) Critico y está esperando revisión (Aprobable por cualquier miembro del equipo).

- Done 🚀 – La tarea está completada y ha sido fusionada con la rama develop / main.

## Ejemplo de Flujo de Trabajo:

- Se crea una nueva tarea y se coloca en To-Do.

- Una vez que empieza el desarrollo, se mueve a In Progress.

- Cuando la funcionalidad está completa, se abre un PR, y la tarea se mueve a Code Review.

- Si es aprobada, la rama se fusiona con develop, y la tarea se mueve a Done.

Este enfoque estructurado asegura una clara visibilidad de las tareas, una colaboración fluida y un ciclo de desarrollo eficiente. 🚀

---

## 👨‍💻 Equipo

- Barneche Facundo
- Gibelli Julian
- Guarino Alan
- Caceffo Juan
- Serafini Federico
- Sacchi Facundo

### Profesores:

- Pablo Andrés Núñez Monzon
- Mariano Cristobo

---

> Proyecto desarrollado en el marco de la materia **Proyecto de Software – TPI** en la **Universidad Nacional de San Martín (UNSAM)**
