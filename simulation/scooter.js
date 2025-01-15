import dotenv from 'dotenv';
dotenv.config();

import database from './modules/scooter_db.js';
import { simulateMovementWithScooter, simulateMovementWithSpeed } from './modules/locationTracker.js';

const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL || 10000;  // Default to 10000 ms
const SCOOTER_SPEED = process.env.SCOOTER_SPEED || 15;  // Default to speed 15
const BATTERY_CHARGE_RATE = process.env.BATTERY_CHARGE_RATE || 500; 

export default class Scooter {
    static saveInterval = 10000;

    constructor(location = {}, scooterID = null) {
        this.scooterID = scooterID; // the scooter receives an ObjectID when imported in the db.
        this.location = location;
        this.user = null;
        this.status = "Off";
        this.speed = 0;
        this.battery = Math.floor(Math.random() * 101);
        this.tripLog = ": [ObjectId], (referens till Trips)";
    };

    updateInterval() {
        // Clear any existing interval first to avoid overlapping
        if (this.user) {
            console.error("An interval is already running for this scooter.");
            return;
        }
    
        // Set up the interval using this.user as the ID
        this.user = setInterval(() => {
            if (this.status !== 'rented') {
                this.stopUpdating();
                return;
            }
            console.log("Updating scooter:", this);
            this.save();
        }, UPDATE_INTERVAL);
    }
    
    stopUpdating() {
        if (this.user) {
            clearInterval(this.user); // Stop the interval
            this.user = null;         // Reset to default when parked
            console.log("Stopped updating.");
        } else {
            console.error("No interval is running for this scooter.");
        }
    }
    
    
    // Update the saving interval based on the current status
    // updateSaveInterval() {
    //     if (this.saveInterval) {
    //         clearInterval(this.saveInterval);
    //     }
    
    //     const intervalTime = this.status === "rented" ? 10000 : 600000; // 10 seconds or 10 minutes
    //     this.saveInterval = setInterval(() => this.save(), intervalTime);
    
    //     console.log(
    //         `Save interval updated: Status is '${this.status}', saving every ${
    //             this.status === "rented" ? "10 seconds" : "10 minutes"
    //         }.`
    //     );
    // }

    async rent(userID) {
        if (this.status !== "available") {
            console.log("Scooter cannot be rented. Current status:", this.status);
            return false;
        }

        console.log('Starting location:', this.location);
        this.setUser(userID);
        this.setStatus("rented");
        this.updateInterval();

        await this.save();


        return true;
    }

    async rideToDestination(destination) {
        console.log("Heading towards: ", destination);
        this.setSpeed(SCOOTER_SPEED);
        // const arrived = await simulateMovementWithSpeed(this.location, destination, this.speed);
        const arrived = await simulateMovementWithScooter(this, destination);
        return arrived
    }

    async park() {
        try {
            this.setStatus("available");
            this.setSpeed(0);
            this.stopUpdating();
            console.log('Saving scooter data...');
            // this.updateSaveInterval();

            await this.save();
        } catch (error) {
            console.error("Error updating scooter status to 'available':", error.message);
            throw new Error("Failed to set scooter status to 'available'");
        }
    }

    async turnOff() {
        try {
            this.setStatus("off");
            await this.save();
            console.log(`${this.scooterID} status updated to 'off' and saved to the database.`);
        } catch (error) {
            console.error("Error updating scooter status to 'off':", error.message);
            throw new Error("Failed to set scooter status to 'off'");
        }
    }

    async charge() {
        try {
            this.setStatus("maintenance");
    
            while (this.battery < 100) {
                this.battery += 1;
                // console.log(`Battery level: ${this.battery}%`);
                await new Promise(resolve => setTimeout(resolve, BATTERY_CHARGE_RATE));
            }
    
            this.setStatus("available");
            console.log(`Battery fully charged: ${this.battery}%`);
            await this.save();
            return;
        } catch (error) {
            console.error("Error during charging process:", error.message);
            throw new Error("Failed to charge scooter");
        }
    }

    batteryLow() {
        return this.battery < 10;
    }

    async printLiveLocation() {
        console.log(this.location);
        return this.location;
    };

    startPrintingLocation() {
        setInterval(() => {
            this.printLiveLocation();
        }, UPDATE_INTERVAL);
    }

    // static createFromDb(jsonObject) {
    //     try {
    //         if (!jsonObject || typeof jsonObject !== "object") {
    //             throw new Error("Invalid JSON object provided.");
    //         }

    //         const {
    //             _id = null,
    //             location = {},
    //             user = "[ObjectID], referens till User",
    //             status = "Off",
    //             speed = 0,
    //             battery = 100,
    //             tripLog = [],
    //         } = jsonObject;

    //         const newScooter = new Scooter(location, _id);
    //         newScooter.user = user;
    //         newScooter.status = status;
    //         newScooter.speed = speed;
    //         newScooter.battery = battery;
    //         newScooter.tripLog = tripLog;

    //         return newScooter;
    //     } catch (error) {
    //         console.error("Error creating scooter from JSON:", error.message);
    //         throw error;
    //     }
    // }

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

            console.log(this.location);
            const result = await database.updateScooter(this.scooterID, updatedScooterData);

            if (result) {
                console.log(`Scooter "${this.scooterID}" updated successfully.`);
            }
        } catch (error) {
            console.error('Error saving scooter:', error.message);
            throw new Error('Failed to save scooter');
        }
    }


    // static async loadScooter(scooterID) {
    //     try {
    //         let scooter = await database.getScooter(scooterID);
    //         if (!scooter) {
    //             throw new Error(`No scooter found with ID: ${scooterID}`);
    //         }
    //         return scooter;
    //     } catch (error) {
    //         console.error('Error loading scooter:', error);
    //         throw new Error('Failed to load scooter');
    //     }
    // }

    // static async updateLocation(scooterID, newLocation) {
    //     try {
    //         let scooter = await Scooter.loadScooter(scooterID);
            
    //         if (!scooter) {
    //             throw new Error(`No scooter found with ID: ${scooterID}`);
    //         }

    //         scooter.location = newLocation;

    //         let updatedScooter = await database.updateLocation(scooterID, scooter.location);
    //         return updatedScooter;
    //     } catch (error) {
    //         console.error('Error updating scooter location:', error);
    //         throw new Error('Failed to update scooter location');
    //     }
    // }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }

    setUser(newUser) {
        //newUser has to be an ID
        this.user = newUser;
    }

    setStatus(newStatus) {
        const validStatuses = ["available", "rented", "maintenance", "off"];
        if (!validStatuses.includes(newStatus)) {
            throw new Error(`Invalid status: ${newStatus}. Must be one of: ${validStatuses.join(", ")}`);
        }
        this.status = newStatus;
    }

    setBattery(newBattery) {
        if (typeof newBattery !== 'number' || newBattery < 0 || newBattery > 100) {
            throw new Error(`Invalid battery level: ${newBattery}. Must be a number between 0 and 100.`);
        }
        this.battery = newBattery;
    }

    printInfo() {
        console.log("ScooterID:", this.scooterID);
        console.log("Location:", this.location);
        console.log("UserID:", this.user);
        console.log("Status:", this.status);
        console.log("Battery:", this.battery);
        console.log("Speed:", this.speed);
        console.log("TripLog:", this.tripLog);
    }

}
