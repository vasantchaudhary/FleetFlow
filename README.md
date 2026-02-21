# FleetFlow

🚛 FleetFlow – Modular Fleet & Logistics Management System

---

## 📌 Overview

FleetFlow is a modular backend-driven fleet management system designed to replace manual logbooks with a centralized, rule-based digital solution.

This prototype focuses on vehicle registry, driver management, and trip dispatching with automated validation and status updates.

The system follows a clean MVC architecture using Node.js and Express.js.

---

## 🎯 Core Features Implemented

### 1️⃣ Vehicle Registry (CRUD)
- Add new vehicles
- View all vehicles
- Update vehicle details
- Delete vehicles
- Capacity tracking
- Status management (Available / On Trip)

### 2️⃣ Driver Management
- Add drivers
- View drivers
- License validation flag
- Driver status tracking

### 3️⃣ Trip Dispatcher Module
- Create new trips
- Assign vehicle + driver
- Validate:
  - Vehicle exists
  - Driver exists
  - Cargo weight ≤ vehicle capacity
  - Driver license validity
- Automatic status updates:
  - Vehicle → "On Trip"
  - Driver → "On Trip"
- Unique Trip ID generation

### 4️⃣ Simple Dashboard (Frontend Demo)
- View vehicles
- View drivers
- Create trip from UI
- Display API responses visually

---

## 🧠 Business Logic Implemented

- Prevent trip creation if cargo exceeds vehicle capacity
- Prevent trip creation if vehicle not found
- Prevent trip creation if driver not found
- Validate driver license before dispatch
- Automatically update operational status on trip creation

---

## 🛠 Tech Stack

- Node.js
- Express.js
- JavaScript
- HTML (Basic Frontend Dashboard)
- RESTful API Architecture

---

## 📂 Project Structure

- server/
  - controllers/
    - vehicleController.js
    - driverController.js
    - tripController.js
  - routes/
    - vehicleRoutes.js
    - driverRoutes.js
    - tripRoutes.js
  - public/
    - index.html
  - index.js
  - package.json
- README.md

---

## 🚀 How To Run The Project

1. Install dependencies:
npm install

2. Start server:
node index.js

3. Open in browser:
http://localhost:8000

---

## 🔗 API Endpoints

Vehicles  
GET    /vehicles  
POST   /vehicles  
PUT    /vehicles/:id  
DELETE /vehicles/:id  

Drivers  
GET    /drivers  
POST   /drivers  

Trips  
GET    /trips  
POST   /trips  

---

## 🔮 Future Scope (Planned Enhancements)

- User Authentication & Role-Based Access Control (RBAC)
- Maintenance & Service Logging Module
- Fuel & Expense Tracking
- Operational Analytics Dashboard
- Database Integration (MongoDB / PostgreSQL)
- Deployment to Cloud (Render / AWS)

---

## 📌 Hackathon Scope

This project demonstrates the core backend architecture and business logic required for a fleet management system, including validation rules and automated workflow handling.

It is built as a scalable foundation for future expansion into a full production-ready logistics platform.