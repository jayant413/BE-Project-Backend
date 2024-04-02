const { hashPassword } = require("../../helper/password-helper");
const { errorResponse, successResponse } = require("../../helper/response-format");
const Organization = require("../../models/organization-modal");
const Passenger = require("../../models/passanger-info-model");
const JWT = require("jsonwebtoken")

const registerPassenger = async (req, res) => {
    try {
        const { rfid_no, name, mobile_number, email_id, aadhaar_no, age, balance } = req.body;
        const { organizationId } = req.params;

        const organization = await Organization.findById(organizationId);
        if (!organization) return errorResponse(res, 404, "Organization not found", error);


        const passengerExistRfid = await Passenger.findOne({ rfid_no: rfid_no }).exec();
        const passengerExistAadhaar = await Passenger.findOne({ aadhaar_no: aadhaar_no }).exec();
        const passengerExistMobile = await Passenger.findOne({ mobile_number: mobile_number }).exec();
        const passengerExistEmail = await Passenger.findOne({ email_id: email_id }).exec();

        if (passengerExistAadhaar) {
            const isPassengerInOrganization = organization.passengers.includes(passengerExistAadhaar._id);
            if (isPassengerInOrganization) return errorResponse(res, 409, "Passenger aahaar number already exists in the organization");

            organization.passengers.push(passengerExistAadhaar._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) return successResponse(res, 200, "Passenger registered to organization successfully", savedOrganization);
            else return errorResponse(res, 500, "Error while existed passenger registration")
        }
        else if (passengerExistRfid) {
            const isPassengerInOrganization = organization.passengers.includes(passengerExistRfid._id);
            if (isPassengerInOrganization) {
                return errorResponse(res, 409, "Passenger RFID number already exists in the organization");
            }

            organization.passengers.push(passengerExistRfid._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) {
                return successResponse(res, 200, "Passenger registered to organization successfully", savedOrganization);
            } else {
                return errorResponse(res, 500, "Error while registering an existing passenger");
            }
        }
        else if (passengerExistMobile) {
            const isPassengerInOrganization = organization.passengers.includes(passengerExistMobile._id);
            if (isPassengerInOrganization) {
                return errorResponse(res, 409, "Passenger mobile number already exists in the organization");
            }

            organization.passengers.push(passengerExistMobile._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) {
                return successResponse(res, 200, "Passenger registered to organization successfully", savedOrganization);
            } else {
                return errorResponse(res, 500, "Error while registering an existing passenger");
            }
        } else if (passengerExistEmail) {
            const isPassengerInOrganization = organization.passengers.includes(passengerExistEmail._id);
            if (isPassengerInOrganization) {
                return errorResponse(res, 409, "Passenger email already exists in the organization");
            }

            organization.passengers.push(passengerExistEmail._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) {
                return successResponse(res, 200, "Passenger registered to organization successfully", savedOrganization);
            } else {
                return errorResponse(res, 500, "Error while registering an existing passenger");
            }
        }
        else {
            const hashedPassword = await hashPassword(mobile_number);
            const registerPassenger = await new Passenger({ rfid_no, name, mobile_number, email_id, aadhaar_no, age, balance, password: hashedPassword }).save();

            organization.passengers.push(registerPassenger._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) return successResponse(res, 200, "Passenger registered successfully", savedOrganization);
            else return errorResponse(res, 500, "Error while new passenger registration")
        }

    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Error while passenger registration", error)
    }
}

const getAllOrganizationPassengers = async (req, res) => {
    try {
        const { organizationId } = req.params;
        const organization = await Organization.findById(organizationId);

        if (!organization) {
            return errorResponse(res, 404, "Organization not found");
        }

        const passengersId = organization.passengers;

        const passengerDetails = await Passenger.find({ _id: { $in: passengersId } });


        return successResponse(res, 200, "Organizaion's passenger's details fetched successfully", { passengerDetails: passengerDetails });
    } catch (error) {
        return errorResponse(res, 500, "Error while fetching organization passengers", error)
    }
}

module.exports = { registerPassenger, getAllOrganizationPassengers };



