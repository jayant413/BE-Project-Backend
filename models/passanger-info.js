const mongoose = require("mongoose");

const PassengerSchema = new mongoose.Schema({
    rfid_no: {
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
    // created_at: {
    //     type: Date,
    //     required: true,
    //     default: Date.now()
    // },
    // updated_at: {
    //     type: Date,
    // },
},
    { timestamps: true }
)


const Contractor = mongoose.model("Passenger", PassengerSchema);

module.exports = Contractor;