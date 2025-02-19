# Scooter Project

## About

This project is developed by a group of students from Blekinge Institute of Technology, specializing in web programming. We were tasked with creating a system to manage the rental of electric scooters for the company Svenska Elsparkcyklar AB.

---

## Background

The company "Svenska Elsparkcyklar AB" requires a system to manage the rental of electric scooters in Swedish cities. The company operates in three different cities and plans to expand to more cities with the support of a new data system. 

---

## Project Structure

This project is contained within a single repository and includes the following services:

- **Backend**: The core API and data management.
- **Admin Web client**: Web dashboard for administrators.
- **Web Client**: The standard web application for customers.
- **Mobile Client**: The mobile-optimized web app for customer interaction.
- **Simulation**: Simulates scooter behavior for testing.
- **Mock API**: A mock API for development and testing purposes.
- **Docker Configuration**: All components are containerized using Docker and Docker Compose.

---

## Getting Started

To run the entire system locally with Docker, follow these steps:

### 1. Clone the Repository

Clone the repository to your local machine:

```
git clone https://github.com/PWKarlsson/vteam-project
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory `vteam-project`, and add the following environment variables:

```
# Global variables
API_KEY="****"
ATLAS_USERNAME="*****"
ATLAS_PASSWORD="*****"

# Frontend
VITE_API_KEY="*****"
VITE_BASE_URL="*****"

# Simulation
NODE_ENV="dev"
RENTING_PERCENTAGE=50
MAX_SIMULATIONS=1000
AMOUNT_OF_USERS=30
SCOOTER_SPEED=200
BATTERY_CHARGE_RATE=100     # Lower number charges faster (1000=1sec)
BATTERY_DEPLETION_RATE=0.5  # Lower depletes slower. 1 is normal
UPDATE_INTERVAL=10000       # How often the scooters should save their data to the db (1000=1sec)
SIMULATION_SPEED=1000       # Lower number speeds up the simulation. Normal is 1000=1sec.
```

### 3. Build and Start the System with Docker Compose

Run the following command to build and start all services using Docker Compose:

```
docker compose up --build
```

This will launch all the components, and the system will be accessible at the following URLs:

- **Backend**: [http://localhost:5001](http://localhost:5001)
- **Admin Dashboard**: [http://localhost:3000](http://localhost:3000)
- **Web Client**: [http://localhost:3001](http://localhost:3001)
- **Mobile Client**: [http://localhost:3002](http://localhost:3002)
- **Simulation**: [http://localhost:4000](http://localhost:4000)

---

## License and Tools

This project uses the following tools and technologies:

- **Git**
- **Node.js**
- **Docker**
- **MongoDB**
- **React + Vite**
- **Express.js**
- **Postman**
- **Figma**

---
