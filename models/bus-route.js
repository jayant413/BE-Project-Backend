const mongoose = require('mongoose');
const Bus = require('./bus');

const segmentSchema = new mongoose.Schema({
    fromStop: {
        type: String,
        required: true,
    },
    toStop: {
        type: String,
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
    },
});

const busRouteSchema = new mongoose.Schema({
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
    bussesOnRoute: [Bus],
    segments: [segmentSchema],
},
    { timestamps: true }
);

const BusRoute = mongoose.model('BusRoute', busRouteSchema);

module.exports = BusRoute;
