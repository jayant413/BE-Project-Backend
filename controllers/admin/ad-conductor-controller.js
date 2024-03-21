const { errorResponse, successResponse } = require("../../helper/response-format");
const JWT = require("jsonwebtoken");
const Organization = require("../../models/organization-modal");
const Conductor = require("../../models/conductor-info-model");



const registerConductor = async (req, res) => {
    try {
        const { id_card_no,
            name,
            mobile_number,
            aadhaar_no,
            email_id, } = req.body;
        const { organizationId } = req.params;

        const organization = await Organization.findById(organizationId);
        if (!organization) return errorResponse(res, 404, "Organization not found", error);



        const conductorExistid = await Conductor.findOne({ id_card_no: id_card_no }).exec();
        const conductorExistAadhaar = await Conductor.findOne({ aadhaar_no: aadhaar_no }).exec();
        const conductorExistMobile = await Conductor.findOne({ mobile_number: mobile_number }).exec();
        const conductorExistEmail = await Conductor.findOne({ email_id: email_id }).exec();

        if (conductorExistAadhaar) {
            const isConductorInOrganization = organization.conductor.includes(conductorExistAadhaar._id);
            if (isConductorInOrganization) return errorResponse(res, 409, "Conductor aahaar number already exists in the organization");

            organization.conductor.push(conductorExistAadhaar._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) return successResponse(res, 200, "Conductor registered to organization successfully", savedOrganization);
            else return errorResponse(res, 500, "Error while existed conductor registration")
        }
        else if (conductorExistid) {
            const isConductorInOrganization = organization.conductor.includes(conductorExistid._id);
            if (isConductorInOrganization) {
                return errorResponse(res, 409, "Conductor RFID number already exists in the organization");
            }

            organization.conductor.push(conductorExistid._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) {
                return successResponse(res, 200, "Conductor registered to organization successfully", savedOrganization);
            } else {
                return errorResponse(res, 500, "Error while registering an existing conductor");
            }
        }
        else if (conductorExistMobile) {
            const isConductorInOrganization = organization.conductor.includes(conductorExistMobile._id);
            if (isConductorInOrganization) {
                return errorResponse(res, 409, "Conductor mobile number already exists in the organization");
            }

            organization.conductor.push(conductorExistMobile._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) {
                return successResponse(res, 200, "Conductor registered to organization successfully", savedOrganization);
            } else {
                return errorResponse(res, 500, "Error while registering an existing conductor");
            }
        } else if (conductorExistEmail) {
            const isConductorInOrganization = organization.conductor.includes(conductorExistEmail._id);
            if (isConductorInOrganization) {
                return errorResponse(res, 409, "Conductor email already exists in the organization");
            }

            organization.conductor.push(conductorExistEmail._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) {
                return successResponse(res, 200, "Conductor registered to organization successfully", savedOrganization);
            } else {
                return errorResponse(res, 500, "Error while registering an existing conductor");
            }
        }
        else {
            const registerConductor = await new Conductor({ id_card_no, name, mobile_number, email_id, aadhaar_no }).save();

            organization.conductor.push(registerConductor._id);
            const savedOrganization = await organization.save();

            if (savedOrganization) return successResponse(res, 200, "Conductor registered successfully", savedOrganization);
            else return errorResponse(res, 500, "Error while new conductor registration")
        }

    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Error while conductor registration", error);
    }
}

const GET_OrganizationConductors = async (req, res) => {
    try {
        const { organizationId } = req.params;
        const organization = await Organization.findById(organizationId);

        if (!organization) {
            return errorResponse(res, 404, "Organization not found");
        }

        const conductorsId = organization.conductor;

        const conductorDetails = await Conductor.find({ _id: { $in: conductorsId } });


        return successResponse(res, 200, "Organizaion's conductor's details fetched successfully", { conductorDetails: conductorDetails });
    } catch (error) {
        return errorResponse(res, 500, "Error while fetching organization conductors", error)
    }
}



module.exports = { registerConductor, GET_OrganizationConductors };