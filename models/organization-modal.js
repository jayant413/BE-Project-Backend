const mongoose = require('mongoose');
const Bus = require('./bus-model');
const Conductor = require('./conductor-info-model');

const adminSchema = new mongoose.Schema({
    admin_name: String,
    admin_mobile_number: String,
    admin_email_id: String,
    admin_aadhaar_no: String
})

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // owner: adminSchema,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    otherAdmins: [adminSchema],
    pendingAdmins: [adminSchema],
    passengers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Passenger',
        },
    ],
    conductor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conductor',
        }
    ],
    busroutes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BusRoute'
        }
    ],
    buses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BusRoute'
        }
    ]
});
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
