const mongoose = require('mongoose');
const BusRoute = require('./bus-route-model');

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
    conductor: {
        type: String,
        required: false,
    },
    busRoute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusRoute',
    },
},
    { timestamps: true }
);

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
