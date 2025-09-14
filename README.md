# 🧠 Triviando - Frontend Next.js

Una aplicación web moderna de trivia desarrollada con Next.js 14, TypeScript y shadcn/ui. Incluye SSR/CSR, animaciones fluidas con Framer Motion, gestión de imágenes con Cloudinary, autenticación, tests automáticos y despliegue listo para Docker.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-%F0%9F%92%96-lightgrey)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-%F0%9F%8C%88-purple)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Images-blue)
![Coverage](https://img.shields.io/badge/Coverage-90%25-success)
![Docker](https://img.shields.io/badge/Docker-ready-blue)

### Cobertura de Tests

![coverage](coverage/lcov-report/src/index.html)

## 🚀 Características Principales

- **⚡ SSR y CSR con Next.js** - Páginas ultra rápidas y SEO friendly
- **🎨 shadcn/ui + Tailwind** - Componentes accesibles y personalizables
- **🌀 Animaciones con Framer Motion** - UX moderna y atractiva
- **☁️ Cloudinary** - Gestión y optimización de imágenes en la nube
- **🔒 Autenticación** - Flujos de login y registro seguros
- **🧪 Testing** - Cobertura con Jest y React Testing Library
- **🐳 Docker Ready** - Despliegue simple y portable
- **🔊 Sonidos** - Feedback auditivo en la experiencia de usuario

## 📦 Requisitos Previos

- **Node.js 18+**
- **npm 9+** o **yarn**
- **Docker** (opcional para despliegue)
- **Git**

## ⚡ Instalación en 3 Pasos

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/triviando-frontend.git
cd triviando-frontend
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz con tus variables (ejemplo):

```dotenv
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud
NEXT_PUBLIC_API_URL=https://api.triviando.com
```

## 🐳 Despliegue con Docker

### Build y Run

```bash
docker build -t triviando-frontend .
docker run -p 3000:3000 --env-file .env.local triviando-frontend
```

## 🏁 Comandos Útiles

| Comando            | Descripción                            |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Inicia en modo desarrollo (hot reload) |
| `npm run build`    | Compila la app para producción         |
| `npm start`        | Ejecuta la app compilada               |
| `npm run lint`     | Corre linter y formatea el código      |
| `npm test`         | Ejecuta los tests automáticos          |
| `npm run coverage` | Genera reporte de cobertura            |

## 🧪 Testing y Cobertura

Ejecuta los tests y revisa la cobertura:

```bash
npm test
npm run coverage
```

Abre el reporte en: `coverage/lcov-report/index.html`

## ☁️ Cloudinary

Las imágenes de usuario y recursos se gestionan y optimizan automáticamente con Cloudinary. Configura tu cloud en `.env.local`.

## 🛠️ Estructura del Proyecto

```text
triviando-frontend/
├── src/
│   ├── app/                # Rutas, layouts y páginas Next.js
│   ├── components/         # Componentes reutilizables (shadcn/ui)
│   ├── services/           # Lógica de negocio y API calls
│   ├── stores/             # Zustand stores (estado global)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utilidades y helpers
│   ├── tests/              # Tests unitarios y de integración
│   └── domain/             # Tipos y modelos de dominio
├── public/                 # Imágenes y assets estáticos
├── coverage/               # Reportes de cobertura
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── ...
```

## 🌐 SSR y CSR

- **SSR**: Páginas renderizadas en servidor para mejor SEO y performance.
- **CSR**: Interactividad y navegación instantánea en el cliente.

## 🎨 UI/UX

- **shadcn/ui**: Sistema de diseño moderno y accesible.
- **Framer Motion**: Animaciones suaves y personalizables.
- **Tailwind CSS**: Utilidades para estilos rápidos y consistentes.

## 🔐 Autenticación

- Flujos de login, registro y gestión de usuario.
- Manejo de tokens y sesiones seguras.

## 📚 Documentación

- Código documentado y tipado con TypeScript.
- Estructura modular y escalable.
