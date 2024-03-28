const { errorResponse, successResponse } = require("../../helper/response-format");
const JWT = require("jsonwebtoken");
const Organization = require("../../models/organization-modal");
const Conductor = require("../../models/conductor-info-model");
const { hashPassword } = require("../../helper/password-helper");



const POST_RegisterConductor = async (req, res) => {
    try {
        const { id_card_no,
            name,
            mobile_number,
            aadhaar_no,
            email_id, } = req.body;
        const { organizationId } = req.params;

        const organization = await Organization.findById(organizationId);
        if (!organization) return errorResponse(res, 404, "Organization not found", error);

        const conductorExistAadhaar = await Conductor.findOne({ aadhaar_no: aadhaar_no }).exec();

        if (conductorExistAadhaar) {
            const isConductorInOrganization = organization.conductor.includes(conductorExistAadhaar._id);

            if (isConductorInOrganization) return errorResponse(res, 409, "Conductor already exists in organization");
            else {
                organization.conductor.push(conductorExistAadhaar._id);
                await organization.save();

                return successResponse(res, 200, "Conductor registered in organization successfully");
            }
        } else {
            const hashedPassword = await hashPassword(mobile_number);

            const registerConductor = await new Conductor({
                id_card_no: id_card_no,
                name: name,
                password: hashedPassword,
                mobile_number: mobile_number,
                email_id: email_id,
                aadhaar_no: aadhaar_no
            }).save();

            const { password, ...conductorWithoutPassword } = registerConductor;

            organization.conductor.push(registerConductor._id);
            await organization.save();

            return successResponse(res, 200, "Conductor registered in organization successfully", { registerConductor: conductorWithoutPassword });

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



module.exports = { POST_RegisterConductor, GET_OrganizationConductors };