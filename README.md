# DevFirst — Frontend

Plataforma de empleo para perfiles IT junior. Este repositorio contiene el
**frontend** de DevFirst, construido como parte del Proyecto Integrado del
ciclo de Desarrollo de Aplicaciones Web (CFGS DAW).

> Por ahora la aplicación funciona con datos de prueba (`src/mocks/data.js`)
> y un sistema de login simulado. El backend (Node.js + Express + MongoDB)
> se está desarrollando en paralelo.

## Stack

- React 19 + Vite
- React Router
- Tailwind CSS v4

## Cómo correrlo en local

```bash
npm install
npm run dev
```

La app quedará disponible en `http://localhost:5173`.

## Estructura

```
src/
  components/   Piezas reutilizables (Navbar, OfertaCard, TechTag...)
  pages/        Una pantalla por archivo
  context/      Contexto de autenticación (mock por ahora)
  mocks/        Datos de prueba, con la misma forma que tendrán los
                documentos reales de MongoDB
  routes/       Configuración de rutas (React Router)
```

## Funcionalidades implementadas (con datos mock)

- Registro / login con selección de rol (candidato / empresa)
- Listado de ofertas con filtros por tecnología, modalidad y área
- Detalle de oferta y aplicación (candidato)
- Perfil editable, distinto según el rol
- Publicación de ofertas (empresa)
- Seguimiento de candidaturas propias (candidato)
- Listado de candidatos recibidos por oferta (empresa)

## Próximos pasos

- Conectar con la API real (Node + Express + MongoDB Atlas)
- Autenticación con JWT
- Subida de CV/portfolio en PDF
