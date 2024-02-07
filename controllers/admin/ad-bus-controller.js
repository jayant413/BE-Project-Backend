const { errorResponse, successResponse } = require("../../helper/response-format");
const Organization = require("../../models/organization-modal");
const Bus = require("../../models/passanger-info-model");
const JWT = require("jsonwebtoken")

const registerBus = async (req, res) => {
    try {
        const { rfid_no, name, mobile_number, email_id, aadhaar_no, age, balance } = req.body;
        const { organizationId } = req.params;

        const organization = await Organization.findById(organizationId);
        if (!organization) return errorResponse(res, 404, "Organization not found", error);


        const busExistRfid = await Bus.findOne({ rfid_no: rfid_no }).exec();
        const busExistAadhaar = await Bus.findOne({ aadhaar_no: aadhaar_no }).exec();
        const busExistMobile = await Bus.findOne({ mobile_number: mobile_number }).exec();
        const busExistEmail = await Bus.findOne({ email_id: email_id }).exec();

        if (busExistAadhaar) {
            const isBusInOrganization = organization.buss.includes(busExistAadhaar._id);
            if (isBusInOrganization) return errorResponse(res, 409, "Bus aahaar number already exists in the organization");

            organization.buss.push(busExistAadhaar._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) return successResponse(res, 200, "Bus registered to organization successfully", savedOrganization);
            else return errorResponse(res, 500, "Error while existed bus registration")
        }
        else if (busExistRfid) {
            const isBusInOrganization = organization.buss.includes(busExistRfid._id);
            if (isBusInOrganization) {
                return errorResponse(res, 409, "Bus RFID number already exists in the organization");
            }

            organization.buss.push(busExistRfid._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) {
                return successResponse(res, 200, "Bus registered to organization successfully", savedOrganization);
            } else {
                return errorResponse(res, 500, "Error while registering an existing bus");
            }
        }
        else if (busExistMobile) {
            const isBusInOrganization = organization.buss.includes(busExistMobile._id);
            if (isBusInOrganization) {
                return errorResponse(res, 409, "Bus mobile number already exists in the organization");
            }

            organization.buss.push(busExistMobile._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) {
                return successResponse(res, 200, "Bus registered to organization successfully", savedOrganization);
            } else {
                return errorResponse(res, 500, "Error while registering an existing bus");
            }
        } else if (busExistEmail) {
            const isBusInOrganization = organization.buss.includes(busExistEmail._id);
            if (isBusInOrganization) {
                return errorResponse(res, 409, "Bus email already exists in the organization");
            }

            organization.buss.push(busExistEmail._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) {
                return successResponse(res, 200, "Bus registered to organization successfully", savedOrganization);
            } else {
                return errorResponse(res, 500, "Error while registering an existing bus");
            }
        }
        else {
            const registerBus = await new Bus({ rfid_no, name, mobile_number, email_id, aadhaar_no, age, balance }).save();

            organization.buss.push(registerBus._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) return successResponse(res, 200, "Bus registered successfully", savedOrganization);
            else return errorResponse(res, 500, "Error while new bus registration")
        }

    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Error while bus registration", error)
    }
}

const getAllOrganizationBus = async (req, res) => {
    try {
        const { organizationId } = req.params;
        const organization = await Organization.findById(organizationId);

        if (!organization) {
            return errorResponse(res, 404, "Organization not found");
        }

        const bussId = organization.buss;

        const busDetails = await Bus.find({ _id: { $in: bussId } });


        return successResponse(res, 200, "Organizaion's bus's details fetched successfully", { busDetails: busDetails });
    } catch (error) {
        return errorResponse(res, 500, "Error while fetching organization buss", error)
    }
}

module.exports = { registerBus, getAllOrganizationBus };



