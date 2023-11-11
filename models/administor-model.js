const mongoose = require("mongoose");

const administratorSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    organization: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }]
}
    , { timestamps: true }
)


const Administrator = mongoose.model("Administrator", administratorSchema);

module.exports = Administrator;