const mongoose = require('mongoose');
const Bus = require('./bus-model');

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
    route_number: {
        type: String,
        required: true,
    },
    route_name: {
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
    number_of_stops: {
        type: String,
        required: true
    },
    all_stops: {
        type: Array,
    },
    bussesOnRoute: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bus',
        }
    ],
    segments: [segmentSchema],
},
    { timestamps: true }
);

const BusRoute = mongoose.model('BusRoute', busRouteSchema);

module.exports = BusRoute;
