import database from './modules/scooter_db.js';
import {getRandomCoordinates, getRandomBatteryLevel, addTen, addWithCoordinates, addTenWithCoordinates } from './utilities.js'

export default class Scooter {
    static updateInterval = 3000;

    constructor(location = {}, scooterID = null) {
        this.scooterID = scooterID; // the scooter recieves an ObjectID when imported in the db.
        this.location = location;
        this.user = "[ObjectID], referens till User";
        this.status = "Off";
        this.speed = 0;
        this.battery = Math.floor(Math.random() * 101);
        this.tripLog = ": [ObjectId], (referens till Trips)";
    };

    async startTrip() {
        if (this.status !== "available") {
            console.log("Trip cannot be started. Current status:", this.status);
            return;
        }
    
        console.log(`Trip started at coordinates: ${this.location}`);
        this.setStatus("rented");
        this.save();
    }
    

    async endTrip() {
        if (this.status !== "rented") {
            console.log("Trip cannot be ended. Current status:", this.status);
            return;
        }
    
        console.log(`Trip ended at coordinates: ${this.location}`);
        this.setStatus(this.battery > 10 ? "available" : "off");
        this.save();
    }
    
    printLiveLocation() {
        console.log(this.location);
        return this.location;
    };

    startPrintingLocation() {
        setInterval(() => {
            this.printLiveLocation();
        }, Scooter.updateInterval);
    }

    static createFromDb(jsonObject) {
        try {
            if (!jsonObject || typeof jsonObject !== "object") {
                throw new Error("Invalid JSON object provided.");
            }

            const {
                _id = null,
                location = {},
                user = "[ObjectID], referens till User",
                status = "Off",
                speed = 0,
                battery = 100,
                tripLog = [],
            } = jsonObject;

            const newScooter = new Scooter(location, _id);
            newScooter.user = user;
            newScooter.status = status;
            newScooter.speed = speed;
            newScooter.battery = battery;
            newScooter.tripLog = tripLog;

            return newScooter;
        } catch (error) {
            console.error("Error creating scooter from JSON:", error.message);
            throw error;
        }
    }

    static async loadObjectScooter(scooterID) {
        try {
            const scooterData = await database.getScooter(scooterID);
            if (!scooterData) {
                throw new Error(`No scooter found with ID: ${scooterID}`);
            }
    
            const scooter = new Scooter(scooterData.location);
            scooter.scooterID = scooterData._id
            scooter.user = scooterData.user;
            scooter.status = scooterData.status;
            scooter.speed = scooterData.speed;
            scooter.battery = scooterData.battery;
            scooter.tripLog = scooterData.tripLog;
    
            return scooter;
        } catch (error) {
            console.error('Error loading scooter:', error);
            throw new Error('Failed to load scooter');
        }
    }

    async save() {
        try {
            const updatedScooterData = {
                location: this.location,
                user: this.user,
                status: this.status,
                speed: this.speed,
                battery: this.battery,
                tripLog: this.tripLog
            };

            const result = await database.updateScooter(this.scooterID, updatedScooterData);

            if (result) {
                console.log('Scooter updated successfully.');
            }
        } catch (error) {
            console.error('Error saving scooter:', error.message);
            throw new Error('Failed to save scooter');
        }
    }

    
    static async loadScooter(scooterID) {
        try {
            let scooter = await database.getScooter(scooterID);
            if (!scooter) {
                throw new Error(`No scooter found with ID: ${scooterID}`);
            }
            return scooter;
        } catch (error) {
            console.error('Error loading scooter:', error);
            throw new Error('Failed to load scooter');
        }
    }

    static async updateLocation(scooterID, newLocation) {
        try {
            let scooter = await Scooter.loadScooter(scooterID);
            
            if (!scooter) {
                throw new Error(`No scooter found with ID: ${scooterID}`);
            }

            scooter.location = newLocation;

            let updatedScooter = await database.updateLocation(scooterID, scooter.location);
            return updatedScooter;
        } catch (error) {
            console.error('Error updating scooter location:', error);
            throw new Error('Failed to update scooter location');
        }
    }


    static async updateStatus(scooterID) {

        const updatedStats = {
            location: getRandomCoordinates(),
            status: "rented",
            speed: 20,
            battery: 75,
            tripLog: ["Trip A", "Trip B", "Trip C"]
        };
        
        try {
            const result = await database.updateScooterStats(scooterID, updatedStats);
            if (result) {
                console.log("Scooter stats updated successfully.");
            }
        } catch (error) {
            console.error("Error updating scooter stats:", error.message);
        }
    }

    park() {
        try {
            this.setStatus("available");
            this.save();
            console.log("Scooter status updated to 'available' and saved to the database.");
        } catch (error) {
            console.error("Error updating scooter status to 'available':", error.message);
            throw new Error("Failed to set scooter status to 'available'");
        }
    }

    setStatus(newStatus) {
        const validStatuses = ["available", "rented", "maintenance", "charging", "off"];
        if (!validStatuses.includes(newStatus)) {
            throw new Error(`Invalid status: ${newStatus}. Must be one of: ${validStatuses.join(", ")}`);
        }
        this.status = newStatus;
        this.speed = newStatus === "rented" ? Math.floor(Math.random() * 26) : 0;
    }


    setBattery(newBattery) {
        if (typeof newBattery !== 'number' || newBattery < 0 || newBattery > 100) {
            throw new Error(`Invalid battery level: ${newBattery}. Must be a number between 0 and 100.`);
        }
        this.battery = newBattery;
    }

    printInfo() {
        console.log("Location:", this.location);
        console.log("UserID:", this.user);
        console.log("Status:", this.status);
        console.log("Battery:", this.battery);
        console.log("Speed:", this.speed);
        console.log("TripLog:", this.tripLog);
    }

}
