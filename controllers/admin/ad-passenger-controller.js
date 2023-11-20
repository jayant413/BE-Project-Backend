const { errorResponse, successResponse } = require("../../helper/response-format");
const Organization = require("../../models/organization-modal");
const Passenger = require("../../models/passanger-info-model");

const registerPassenger = async (req, res) => {
    try {
        const { rfid_no, name, mobile_number, email_id, aadhaar_no, age, balance, organizationId } = req.body;

        const passengerExist = await Passenger.findOne({ aadhaar_no: aadhaar_no });

        if (passengerExist) {
            const organization = await Organization.findById(organizationId);
            console.log(organization)
            if (!organization) return errorResponse(res, 404, "Organization not found", error);

            const isPassengerInOrganization = organization.passengers.includes(passengerExist._id);

            if (isPassengerInOrganization) return errorResponse(res, 400, "Passenger already exists in the organization");

            organization.passengers.push(passengerExist._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) return successResponse(res, 200, "Passenger added to organization successfully", savedOrganization);
            else return errorResponse(res, 500, "Error while existed passenger registration")
        }

        const registerPassenger = await new Passenger({ rfid_no, name, mobile_number, email_id, aadhaar_no, age, balance }).save();

        const organization = await Organization.findById(organizationId);

        if (!organization) return errorResponse(res, 404, "Organization not found", error);
        organization.passengers.push(registerPassenger._id);
        const savedOrganization = await organization.save();

        if (savedOrganization) return successResponse(res, 200, "Passenger registered successfully", savedOrganization);
        else return errorResponse(res, 500, "Error while new passenger registration")

    } catch (error) {
        return errorResponse(res, 500, "Error while passenger registration", error)
    }
}

module.exports = { registerPassenger }