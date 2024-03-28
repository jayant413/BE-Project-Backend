const mongoose = require("mongoose");

const ConductorSchema = new mongoose.Schema({
    id_card_no: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
    },
    aadhaar_no: {
        type: String,
        required: true,
        unique: true
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    }
},
    { timestamps: true }
)


const Conductor = mongoose.model("Conductor", ConductorSchema);

module.exports = Conductor;