# Reddit API

## Descripción

Reddit API es una API construida con Node.js y Express que permite interactuar con datos de Reddit, almacenándolos en una base de datos MySQL y proporcionando endpoints RESTful conforme a la especificación JSON:API.

## Requisitos

Antes de empezar, asegúrate de tener instalados los siguientes requisitos:

- **Node.js** (versión 14 o superior)
- **XAMPP** (para gestionar MySQL y Apache)
- **Git** (Para clonar el repositorio.)
- **Postman** (o cualquier cliente API de tu preferencia): Para consumir la API.

## Instalación

### 1. Clonar el Repositorio

Clona el proyecto desde GitHub:

```bash
git clone https://github.com/SebastianHinestroza12/reddit-api.git

cd reddit-api

```

### 2. Configure Environment Variables

Create a `.env` file in the root of the project and configure the following environment variables:

```json
{
  "PORT" :3001,
  "DB_USER": root,
  "DB_PORT": 3306,
  "DB_HOST": localhost,
  "DB_NAME": reddit_db,
  "DB_PASSWORD": "",
  "API_BASE_URL": http://localhost:3001
}

```

### 3. Instalar dependencias

Instala las dependencias necesarias utilizando npm:

```bash
npm install
```

### 4. Configurar XAMPP

- Ejecute XAMPP y asegúrese de que los servicios de MySQL y Apache estén en funcionamiento.

- Abre phpMyAdmin (normalmente disponible en http://localhost/phpmyadmin).

- Crea una base de datos de llamada reddit_db.

### 5. Ejecutar la API

- Inicie el servidor con el siguiente comando:

```bash
npm run dev
```

### 6. Consumir la API

Puedes utilizar Postman o tu cliente de API preferido para consumir los endpoints. Los puntos finales disponibles son:

- GET /api/v1/subreddits - Recupera una lista de subreddits.

- POST /api/v1/subreddits - Crea nuevos subreddits. **Ejecutar primero para poblar la base de datos.**

- GET /api/v1/subreddits/{subredditId} - Recupera un subreddit por su ID.

### 7. Diagrama de Entidades y Relaciones

El siguiente diagrama muestra las entidades utilizadas en la base de datos y sus relaciones:

- Subreddit : Tabla principal que almacena información sobre los subreddits.

- SubredditMetadata : Tabla secundaria que almacena metadatos asociados a los subreddits.

[VISUALIZAR DIAGRAMA](https://drawsql.app/teams/mena-3/diagrams/reddit-db)

## Authors

- [@SebastianHinestroza12](https://github.com/SebastianHinestroza12)
