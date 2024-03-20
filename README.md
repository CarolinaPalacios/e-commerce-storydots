# 🛒 E-commerce-storydots

E-commerce desarrollado como Challenge para StoryDots.

[![Visita la web](https://img.shields.io/badge/Visita%20la%20web-black?style=for-the-badge&logo=firebase&logoColor=yellow)](https://e-commerce-storydots-challenge.web.app/)

**Desarrollado con:**

[![NestJS](https://img.shields.io/badge/NestJS-gray?style=for-the-badge&logo=nestjs&logoColor=e0234e)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-gray?style=for-the-badge&logo=postgresql&logoColor=007acc)](https://www.postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-gray?style=for-the-badge&logo=prisma&logoColor=00c2cb)](https://prisma.io) [![TypeScript](https://img.shields.io/badge/TypeScript-gray?style=for-the-badge&logo=typescript&logoColor=007acc)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-gray?style=for-the-badge&logo=vite&logoColor=yellow)](https://vitejs.dev) [![React](https://img.shields.io/badge/React-gray?style=for-the-badge&logo=react&logoColor=61dafb)](https://reactjs.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-gray?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)](https://tailwindcss.com)
[![Zod](https://img.shields.io/badge/Zod-gray?style=for-the-badge&logo=zod&logoColor=007acc)](https://github.com/colinhacks/zod)

[![Website](https://img.shields.io/badge/website-up-green)](https://e-commerce-storydots-challenge.web.app/)

## Descripción

E-commerce Storydots es una aplicación web diseñada para gestionar productos de una tienda en línea. Permite a los usuarios crear, editar, eliminar y ver productos disponibles en el catálogo. El proyecto está dividido en un backend desarrollado con NestJS y un frontend construido con ReactJS.

<div style="display: flex; margin-left: 10px;">
<img src="./assets/home.png" alt="Home" style="width: 48%;">
  
  <img src="./assets/detail.png" alt="Detail" style="width: 48%; margin-left: 10px;">
</div>

## Funcionalidades

### Backend (NestJS)

- Gestión de productos: Crud completo para la gestión de productos.
- Uso de Prisma: ORM para interactuar con una base de datos PostgreSQL.
- Uso de ts-rest/nest: Definición de contratos utilizando TypeScript y Zod para la validación de datos en las solicitudes y respuestas.

### Frontend (ReactJS)

- Interfaz de usuario intuitiva: Permite a los usuarios navegar fácilmente por las diferentes secciones de la aplicación.
- Uso de ts-rest/react-query: Definición de contratos utilizando TypeScript y Zod para la validación de datos en las solicitudes y respuestas.
- Estado global: Utiliza Zustand para la gestión del estado de la aplicación de forma eficiente y sencilla.
- Estilos con TailwindCSS: Usa Tailwind CSS para una rápida y fácil personalización de la interfaz de usuario.

## Cómo levantar el proyecto en local

### Requisitos previos

- [Node.js](https://nodejs.org): Asegurate de tener Node.js 20 LTS o superior instalado en tu sistema. Para instalarlo puedes acceder al sitio oficial de Node.js.
- [pnpm](https://pnpm.io): Este proyecto usa pnpm como un gestor de paquetes. Una vez que tienes Node.js instalado, instala globalmente pnpm con el siguiente comando:

```bash
npm i -g pnpm
```

- [NestJS](https://nestjs.com): NestJS se usa como framework de Node.js para el backend de este proyecto. Para instalarlo globalmente utiliza el siguiente comando:

```
npm i -g @nestjs/cli
```

Esto instalará la interfaz de línea de comandos de NestJS globalmente en tu sistema, permitiendo utilizarla para generar proyectos y componentes NestJS.
Alternativamente, si prefieres no instalarlo, este proyecto ya lo tiene instalado como una dependencia en el archivo `package.json`, por lo que podrías usarlo ejecutando `npx nest` en lugar de `nest`, cambiando los scripts del proyecto.

## 💾 Instalación

[Clonar el repositorio](https://github.com/CarolinaPalacios/e-commerce-storydots): Clona, descarga o haz fork del repositorio.

```bash
# Clonar el repositorio
git clone https://github.com/CarolinaPalacios/e-commerce-storydots.git

# Navegar al directorio
cd e-commerce-storydots

# Navegar al directorio backend
cd backend

# Instalar las dependencias
pnpm install

# Navegar al directorio frontend
cd ../frontend

# Instalar las dependencias
pnpm install
```

## 🚀 Configuración del entorno backend

- Navega hasta el directorio `backend`.

- Crea un archivo .env con las siguientes variables de entorno:

```bash
PORT=3000
DATABASE_URL= # URL de la base de datos, por ejemplo: postgresql://user:password@localhost:5432/db_name
```

- Genera los archivos de Prisma con el siguiente comando:

```bash
pnpm prisma db push
```

Esta generación asegura que los modelos y funciones de Prisma estén actualizados y se ajusten a la estructura de la base de datos.

- Ejecuta el servidor con el siguiente comando:

```bash
pnpm start:dev
```

Esto inicializa el servidor en modo de desarrollo, ya se puede acceder al mismo en http://localhost:3000/api.

Inicialmente, si ingresas a esta URL, estará la documentación del backend generada por Swagger, estos son los endpoints disponibles:

**Products**:

- GET /products: Obtiene todos los productos.
- GET /products/:id: Obtiene un producto especifico por su ID.
- POST /products: Crea un nuevo producto.
- PATCH /products/:id: Actualiza un proyecto por su ID.
- DELETE /products/:id: Elimina un proyecto por su ID.

**Brands**:

- GET /brands: Obtiene todas las marcas.
- GET /brands/:id/products: Obtiene todos los productos de una marca.

Adicionalmente si quieres iniciar el proyecto con productos, puedes usar Postman u otra interfaz de usuario para crear algunos en la base de datos, para esto, creé una función en AppController que crea los datos de prueba.
Haciendo una petición de tipo POST a http://localhost:3000/api/data/load se creará un conjunto de datos de prueba.

## 🖌️ Configuración del entorno frontend

- En otra terminal navega hasta el directorio `frontend`.

- Crea un archivo .env con la siguiente variable de entorno:

```bash
VITE_API_BASE_URL= # URL del backend, para local: http://localhost:3000/api
```

- Ejecuta el servidor con el siguiente comando:

```bash
pnpm dev
```

Esto inicializa el cliente en modo de desarrollo, ya se puede acceder al mismo en http://localhost:5173.

## Construcción de la aplicación

- Si quieres construir la aplicación backend, puedes hacerlo en el directorio `backend` con el siguiente comando:

```bash
pnpm start:prod
```

- Si quieres construir la aplicación frontend, puedes hacerlo en el directorio `frontend` con el siguiente comando:

```bash
pnpm build
```

---

### Extras

- Integración con Firebase: Creación de usuarios, autenticación y gestión de usuarios.

Esto está comentado tanto en el backend como en el frontend por errores del navegador al querer iniciar sesión con el popup de Google, pero se puede descomentar y probarlo ya que funciona localmente. Para usar la autenticación hay que crear un proyecto en Firebase desde la [consola](https://console.firebase.google.com/). La documentación te guiará para generar las credenciales, y además en el dashboard debes agregar como método de acceso el proveedor de autenticación de Google.

Guarda el archivo que te brinda Firebase y una vez que tengas las credenciales, puedes agregarlas en el archivo .env de la aplicación.

Para el backend necesitarás:

```bash
FIREBASE_PRIVATE_KEY= # el valor de private_key
FIREBASE_PROJECT_ID= # el valor de project_id
FIREBASE_CLIENT_EMAIL= # el valor de client_email
```

Para el frontend necesitarás:

```bash
VITE_FIREBASE_API_KEY= # el valor de API web (esto lo encuentras en la consola de Firebase)
VITE_FIREBASE_AUTH_DOMAIN= # el valor de auth_domain
VITE_FIREBASE_PROJECT_ID= # el valor de project_id
VITE_FIREBASE_STORAGE_BUCKET= # el valor de storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID= # el valor de messaging_sender_id
VITE_FIREBASE_APP_ID= # el valor de app_id
```

Y listo, puedes volver a iniciar la aplicación, deberías poder loguearte con el popup de Google y verás que sólo estando logueado podrías interactuar con el dashboard.

## 🤝 Ayuda

Si conoces alguna solución para el problema a la hora de construir la aplicación integrando Firebase, puedes contactar conmigo o puedes mandar un pull request y la estaré revisando 🙌.
