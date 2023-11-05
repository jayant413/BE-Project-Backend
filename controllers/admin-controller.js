const JWT = require('jsonwebtoken');

const Administrator = require("../models/administor-model");

const { hashPassword, comparePassword } = require("../helper/password-helper");
const { errorResponse, successResponse } = require("../helper/response-format");


const registerAdmin = async (req, res) => {
    try {
        const { name, email_id, mobile_number, aadhaar_no, password } = req.body;

        const hashedPassword = await hashPassword(password);

        const existingAdmin = await Administrator.findOne({
            $or: [
                { email_id: email_id },
                { mobile_number: mobile_number },
                { aadhaar_no: aadhaar_no },
            ]
        });

        if (existingAdmin) return errorResponse(res, 409, "Already registered please login")

        const admin = await new Administrator({ name, email_id, mobile_number, aadhaar_no, password: hashedPassword }).save();

        return successResponse(res, 200, "Admin registered successfully", admin)

    } catch (error) {
        return errorResponse(res, 500, "Error while admin registration", error)
    }
};


const loginAdmin = async (req, res) => {
    try {
        const { email_id, mobile_number, password } = req.body;

        const admin = await Administrator.findOne({
            $or: [
                { email_id: email_id },
                { mobile_number: mobile_number }
            ]
        })
        if (!admin) return errorResponse(res, 404, "Email is not registered");

        const match = await comparePassword(password, admin.password)

        if (!match) return errorResponse(res, 401, "Incorrect Password");

        const token = await JWT.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        return successResponse(res, 200, "Logged in successfully", { token: token })

    } catch (error) {
        return errorResponse(res, 500, "Error while admin login", error)
    }
}

module.exports = { registerAdmin, loginAdmin };