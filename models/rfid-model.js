const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    place: {
        type: String,
    },
    entryAt: {
        type: String,
    },
    status: {
        type: String,
        enum: ['in', 'out', 'scanned'],
    },
    ticketPrice: {
        type: Number
    },
    balance: {
        type: Number
    }
})


const rfidCardSchema = new mongoose.Schema({
    rfid: {
        type: String,
        required: true
    },
    entries: [entrySchema]
});


const RfidCard = mongoose.model('RfidCard', rfidCardSchema);


module.exports = RfidCard;