
import database from './modules/scooter_db.js';

let currentId = 1; // Initialize the starting ID

export default function Scooter(id = currentId++, location = {}) { 
    this._id = id; // Assign the ID to this scooter
    this.location = location;
    this.status = "Off";
    this.rented = false;
    this.battery = Math.floor(Math.random() * 101);


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
    

    this.printInfo = function () {
        console.log("Scooter Id", this._id);
        console.log("Battery:", this.battery);
        console.log("Location:", this.location);
        console.log("Status:", this.status);
        console.log("Rented?:", this.rented);

    }

}


