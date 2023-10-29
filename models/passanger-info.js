const mongoose = require("mongoose");

const PassengerSchema = new mongoose.Schema({
    rfid_no: {   // passengerId
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    mobile_number: {
        type: String,
        required: true,
        unique: true
    },
    email_id: {
        type: String,
        required: true,
        unique: true
    },
    aadhaar_no: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    balance: {
        type: Number,
        required: true
    },
    passengerLogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PassengerLog',
        },
    ],
},
    { timestamps: true }
)


const Passenger = mongoose.model("Passenger", PassengerSchema);

module.exports = Passenger;