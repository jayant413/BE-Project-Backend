const mongoose = require("mongoose");

const AdministratorSchema = new mongoose.Schema({
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
}
    , { timestamps: true }
)


const Administrator = mongoose.model("Administrator", AdministratorSchema);

module.exports = Administrator;