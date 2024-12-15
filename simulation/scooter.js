import database from './modules/scooter_db.js';


export default function Scooter(location = {}) { 
    this.location = location;
    this.status = "Off";  // Default status
    this.battery = Math.floor(Math.random() * 101); // Battery level is random as default
    this.tripLog = ": [ObjectId], (referens till Trips";

    // Ensure status can only be one of the specified values
    this.setStatus = function(newStatus) {
        const validStatuses = ["available", "rented", "maintenance", "charging"];
        if (!validStatuses.includes(newStatus)) {
            throw new Error(`Invalid status: ${newStatus}. Must be one of: ${validStatuses.join(", ")}`);
        }
        this.status = newStatus;
    };

    this.getStatus = function () {
        if (this.battery <= 0) {
            this.status = "Off";
        } else if (this.battery <= 10) {
            this.status = "Low battery";
        } else {
            this.status = "On";
        }
        return this.status;
    };

    this.setBattery = function(newBattery) {
        if (typeof newBattery !== 'number' || newBattery < 0 || newBattery > 100) {
            throw new Error(`Invalid battery level: ${newBattery}. Must be a number between 0 and 100.`);
        }
        this.battery = newBattery;
    };

    this.printInfo = function () {
        console.log("Battery:", this.battery);
        console.log("Location:", this.location);
        console.log("Status:", this.status);
        console.log("TripLog:", this.tripLog);
    }


}
