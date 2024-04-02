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


const busSchema = new mongoose.Schema({
    busRouteID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusRoute',
    },
    conductorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conductor',
    },
    busNumber: {
        type: String,
        unique: true,
        required: true,
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
    journey: [
        [journeySchema]
    ]
},
    { timestamps: true }
);

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
