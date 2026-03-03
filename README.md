Updated README (Docker DB Version)
# MEAN Stack Coding Test Application (Dockerized DB Setup)

##  Project Overview

This is a full-stack MEAN application developed as part of a coding assessment.

It includes:
- Product CRUD (MongoDB - Docker)
- User Authentication (MySQL - Docker)
- Order API
- Third-party API Integration
- JWT Authentication
- Unit Testing

---

#  Tech Stack

Frontend:
- Angular
- Angular Services
- HttpClient

Backend:
- Node.js
- Express.js

Databases (Dockerized):
- MongoDB (Products & Orders)
- MySQL (Users)

Security:
- bcrypt
- JWT

Containerization:
- Docker
- Docker Compose

---

#  Docker Setup (MongoDB + MySQL)

## 1️ Install Docker

Download and install Docker from:
https://www.docker.com/products/docker-desktop

Verify installation:

```bash
docker --version
2️ docker-compose.yml

Create this file in project root:

version: '3.8'

services:

  mongodb:
    image: mongo:latest
    container_name: mongodb_container
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: productdb
    volumes:
      - mongo_data:/data/db

  mysql:
    image: mysql:8
    container_name: mysql_container
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: testdb
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mongo_data:
  mysql_data:
3️ Start Databases

Run:

docker-compose up -d

Check running containers:

docker ps

MongoDB → localhost:27017
MySQL → localhost:3306

⚙️ Backend Setup
Install Dependencies
cd backend
npm install
Create .env file
PORT=3000

MONGO_URI=mongodb://localhost:27017/productdb

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=rootpassword
MYSQL_DATABASE=testdb

JWT_SECRET=your_secret_key
Start Backend
npm start

Server runs at:
http://localhost:3000

🗄 MySQL Table Setup

Run this query inside MySQL container:

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

You can access MySQL container using:

docker exec -it mysql_container mysql -u root -p

Password: rootpassword

🗄 MongoDB Collections

Auto-created on first insert:

products

orders

🚀 Features
Product CRUD (MongoDB)

Create

Get All

Get By ID

Update

Delete

User Authentication (MySQL)

Register

Login

bcrypt password hashing

JWT authentication

Order API
Method	Endpoint
POST	/api/orders
GET	/api/orders/:id
PUT	/api/orders/:id
DELETE	/api/orders/:id
Third-Party API Integration

Example: Weather API

Fetch current weather

Display on dashboard

Proper error handling

 Testing

Run backend tests:

npm test
 Stop Docker Containers
docker-compose down
 Evaluation Criteria Covered

 Clean architecture
 Dockerized database setup
 RESTful API
 Secure authentication
 Proper error handling
 Unit testing
 Third-party API integration

