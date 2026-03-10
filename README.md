# Project Setup Guide
**MongoDB • MySQL • Node.js • Angular 14**

---

## Folder Structure

```
MEAN-STACK-APP/
├── backend/
│   ├── config/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── order.controller.js
│   │   └── product.controller.js
│   ├── models/
│   ├── routes/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── .angular/
│   ├── .vscode/
│   ├── dist/
│   ├── node_modules/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   ├── pages/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── login/
│   │   │   │   ├── products/
│   │   │   │   └── register/
│   │   │   ├── services/
│   │   │   ├── app-routing.module.ts
│   │   │   ├── app.component.css
│   │   │   ├── app.component.html
│   │   │   ├── app.component.spec.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.module.ts
│   │   │   └── auth.guard.ts
│   │   ├── assets/
│   │   ├── environments/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── main.ts
│   │   ├── polyfills.ts
│   │   ├── styles.css
│   │   └── test.ts
│
├── docker-compose.yml
└── README.md
```

---

## Environment Requirements

| Tool | Version |
|------|---------|
| Node.js | v20.12.2 (64-bit) |
| Angular CLI | 14.2.13 |
| Docker | Latest |
| MongoDB | Docker container |
| MySQL | Docker container |

---

## Docker Database Setup

Both databases run in Docker containers — no local installation needed.

### 1. docker-compose.yml

Create this file in the project root:

```yaml
version: "3.8"
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb_container
    restart: always
    ports: ["27017:27017"]
    environment:
      MONGO_INITDB_DATABASE: meanApp
    volumes: [mongo_data:/data/db]

  mysql:
    image: mysql:8
    container_name: mysql_container
    restart: always
    ports: ["3306:3306"]
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: mean_auth
    volumes: [mysql_data:/var/lib/mysql]

volumes:
  mongo_data:
  mysql_data:
```

### 2. Start / Stop Containers

```bash
docker compose up -d     # Start in background
docker compose down      # Stop containers
docker ps                # Verify running containers
```

---

## Database Connections

### MongoDB — Products & Orders

Config file: `config/mongo.js`

```javascript
mongoose.connect("mongodb://localhost:27017/meanApp");
```

### MySQL — User Auth

Config file: `config/mysql.js`

```javascript
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mean_auth"
});
```

### Create Users Table

```sql
-- Connect: docker exec -it mysql_container mysql -u root -p

CREATE TABLE users (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

---

## Install & Run

### Install Dependencies

```bash
cd backend  && npm install
cd frontend && npm install
```

### Install Angular CLI (if needed)

```bash
npm install -g @angular/cli@14
ng version
```

### Start Backend

```bash
node server.js
```

Server: `http://localhost:3000`

Expected output:
```
Server running on 3000
MongoDB connected
MySQL connected
```

### Start Frontend

```bash
cd frontend
ng serve   # or: npm start
```

App: `http://localhost:4200`

Expected output:
```
✔ Compiled successfully.
✔ Angular Live Development Server is listening on localhost:4200
```

---

## Why Docker?

- No local database installation required
- Consistent environment across development and production
- Quick setup with a single `docker compose` command
- Isolated containers prevent conflicts with other projects