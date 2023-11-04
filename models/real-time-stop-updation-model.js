const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
    stopName: {
        type: String,
        required: true,
    },
    sequence: {
        type: Number,
        required: true,
    },
    // Additional attributes you might want for each stop
});

const realTimeBusStopSchema = new mongoose.Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true, // Reference to the bus route for the journey
    },
    busNumber: {
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
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    stops: [stopSchema],
    currentStop: {
        type: String, // Store the name of the current stop
    },
},
    { timestamps: true }
);

const RealTimeBusStop = mongoose.model('RealTimeBusStop', realTimeBusStopSchema);

module.exports = RealTimeBusStop;
