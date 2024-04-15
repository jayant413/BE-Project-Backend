const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
    stop: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
})

const passengersInBusSchema = new mongoose.Schema({
    passengerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger',
    },
    rfidCard: String,
    inTime: String,
    inPlace: String,
    outTime: String,
    outPlace: String
})


const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        unique: true,
        required: true,
    },
    busRouteID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusRoute',
    },
    conductorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conductor',
    },
    conductorName: {
        type: String,
        required: true,
    },
    routeNumber: {
        type: String,
        required: true,
    },
    routeName: {
        type: String,
        required: true,
    },
    journeyStatus: {
        type: String,
        enum: ["on", "off"],
        default: "off"
    },
    passengersInBus: [passengersInBusSchema],
    journey: [
        [journeySchema]
    ]
},
    { timestamps: true }
);

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
