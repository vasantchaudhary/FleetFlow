# FleetFlow

FleetFlow – Modular Fleet & Logistics Management System

Overview:
FleetFlow is a backend system for managing vehicles, drivers, and trips with validation and automated status updates.

Features:
- Vehicle Registry (CRUD)
- Driver Registry
- Trip Dispatcher
- Cargo capacity validation
- Auto vehicle status update
- Auto driver status update
- Modular MVC architecture

Tech Stack:
- Node.js
- Express.js

How to Run:

1. Install dependencies:
   npm install

2. Start server:
   node index.js

Server runs at:
http://127.0.0.1:8000


API Endpoints:

Vehicles:
GET    /vehicles
POST   /vehicles
PUT    /vehicles/:id
DELETE /vehicles/:id

Drivers:
GET  /drivers
POST /drivers

Trips:
GET  /trips
POST /trips


Business Logic Implemented:

- Trip creation validates:
  - Vehicle exists
  - Driver exists
  - Vehicle availability
  - Driver availability
  - Cargo weight does not exceed vehicle capacity

- On successful trip creation:
  - Vehicle status → "On Trip"
  - Driver status → "On Trip"

Status:
Backend Complete (Full CRUD + Validation + Modular Structure)