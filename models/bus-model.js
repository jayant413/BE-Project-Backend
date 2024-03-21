const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        unique: true,
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
    conductorName: {
        type: String,
        required: true,
    },
    busRouteID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusRoute',
    },
    conductorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusRoute',
    },
},
    { timestamps: true }
);

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
