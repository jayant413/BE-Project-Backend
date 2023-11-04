const mongoose = require('mongoose');

const passengerLogSchema = new mongoose.Schema({
    passengerId: {
        type: String,
        required: true, // RFID card identifier for each passenger
    },
    routeNumber: {
        type: String,
        required: true, // RFID card identifier for each passenger
    },
    routeName: {
        type: String,
        required: true, // RFID card identifier for each passenger
    },
    busNumber: {
        type: String,
        required: true, // RFID card identifier for each passenger
    },
    busRouteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusRoute',
        required: true, // Reference to the bus route for the journey
    },
    ticketPrice: {
        type: String,
        required: false, // The stop where the passenger exited (can be null until exit)
    },
    entryStop: {
        type: String,
        required: true, // The stop where the passenger entered
    },
    entryTime: {
        type: Date,
        required: true, // Time of entry
    },
    exitStop: {
        type: String,
        required: false, // The stop where the passenger exited (can be null until exit)
    },
    exitTime: {
        type: Date,
        required: false, // Time of exit (null until exit)
    },
},
    { timestamps: true }
);

const PassengerLog = mongoose.model('PassengerLog', passengerLogSchema);

module.exports = PassengerLog;
