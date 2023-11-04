const { hashPassword } = require("../helper/password-helper");
const { errorResponse, successResponse } = require("../helper/response-format");
const Administrator = require("../models/administor-model");

const registerAdmin = async (req, res) => {
    try {
        const { name, email_id, mobile_number, aadhaar_no, password } = req.body;

        const hashedPassword = await hashPassword(password);

        const existingUser = await Administrator.findOne({
            $or: [
                { email_id: email_id },
                { mobile_number: mobile_number },
                { aadhaar_no: aadhaar_no },
            ]
        });

        if (existingUser) return errorResponse(res, 409, "Already Registered please login")

        const user = await new Administrator({ name, email_id, mobile_number, aadhaar_no, password: hashedPassword }).save();

        return successResponse(res, 200, "Admin Registered Successfully")

    } catch (error) {
        return errorResponse(res, 500, "Error while admin registration", error)
    }
};


module.exports = { registerAdmin };