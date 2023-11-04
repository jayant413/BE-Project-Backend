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
    conductor: {
        type: String,
        required: false,
    }
},
    { timestamps: true }
);

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
