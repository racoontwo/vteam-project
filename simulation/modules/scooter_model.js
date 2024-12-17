import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const scooterSchema = new Schema({
    location: {
        type: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true }
        },
        required: true,
        default: { lat: 0, lng: 0 }
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        default: null
    },
    status: {
        type: String,
        enum: ["available", "rented", "maintenance", "charging", "off"],
        default: "off",
        required: true
    },
    speed: {
        type: Number,
        default: 0,
        min: 0,
        max: 25
    },
    battery: {
        type: Number,
        default: () => Math.floor(Math.random() * 101),
        required: true,
        min: 0,
        max: 100
    },
    tripLog: [{
        type: Types.ObjectId,
        ref: 'Trip',
        default: []
    }]
}, {
    timestamps: true
});

const Scooter = model('Scooter', scooterSchema);

export default Scooter;
