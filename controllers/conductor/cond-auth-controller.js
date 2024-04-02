const JWT = require('jsonwebtoken');
const Conductor = require("../../models/conductor-info-model");

const { comparePassword } = require("../../helper/password-helper");
const { errorResponse, successResponse } = require("../../helper/response-format");
const Bus = require('../../models/bus-model');

const POST_ConductorLogin = async (req, res) => {
    const { email_id, password } = req.body;

    try {
        const conductor = await Conductor.findOne({ email_id: email_id });
        if (!conductor) return errorResponse(res, 404, "Not registered");

        const verifyPassword = await comparePassword(password, conductor.password);

        if (verifyPassword) {
            const token = JWT.sign({ _id: conductor._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie("ecopass_conductor_token", token, { maxAge: 7 * 24 * 60 * 60 * 1000, path: "/", httpOnly: true })

            return successResponse(res, 200, "logged in successfully", { _id: conductor._id })
        }
        else return errorResponse(res, 401, "Invalid password");

    } catch (error) {
        return errorResponse(res, 500, "Error while conductor login", error);
    }
};


const GET_ConductorAssignedBus = async (req, res) => {
    const { ecopass_conductor_token } = req.cookies;

    try {
        const decodedToken = JWT.verify(ecopass_conductor_token, process.env.JWT_SECRET);

        const assignedBus = await Bus.findOne({ conductorID: decodedToken._id }).exec();

        if (assignedBus) {
            return successResponse(res, 200, "Conductor is assigned to a bus.", { assignedBus: assignedBus, conductorID: decodedToken._id })
        } else {
            return errorResponse(res, 200, "Conductor is not assigned to any bus.", { conductorID: decodedToken._id });
        };
    } catch (error) {
        return errorResponse(res, 500, " Error while fetching conductor assigned bus details", error);
    }

};

const GET_ConductorLogout = (req, res) => {
    try {
        res.clearCookie("ecopass_conductor_token");
        return successResponse(res, 200, "Logged out successfully")
    } catch (error) {
        return errorResponse(res, 500, "Error while logging out conductor", error);
    }
}

module.exports = { POST_ConductorLogin, GET_ConductorAssignedBus, GET_ConductorLogout }