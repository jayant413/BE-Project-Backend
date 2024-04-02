const JWT = require("jsonwebtoken");

const Passenger = require("../../models/passanger-info-model");

const { errorResponse, successResponse } = require("../../helper/response-format");
const { comparePassword } = require("../../helper/password-helper");

const POST_PassengerLogin = async (req, res) => {
    const { email_id, password } = req.body;
    if (!email_id || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const passenger = await Passenger.findOne({ email_id: email_id });
        if (!passenger) return errorResponse(res, 404, "Passenger Not registered");


        const verifyPassword = await comparePassword(password, passenger.password);

        if (verifyPassword) {
            const token = JWT.sign({ _id: passenger._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie("ecopass_passenger_token", token, { maxAge: 7 * 24 * 60 * 60 * 1000, path: "/", httpOnly: true })

            return successResponse(res, 200, "logged in successfully", { _id: passenger._id })
        }
        else return errorResponse(res, 401, "Invalid password");

    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Error while passenger login.", error);
    }
}

const GET_PassengerDetails = async (req, res) => {
    try {

        const { ecopass_passenger_token } = req.cookies;

        if (ecopass_passenger_token) {
            const decodedToken = JWT.verify(ecopass_passenger_token, process.env.JWT_SECRET);

            const passenger = await Passenger.findById(decodedToken._id).select('-password');

            return successResponse(res, 200, "passenger details fetched successfully.", { passengerDetails: passenger })
        }

        throw new Error("Passenger token not found.")

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Error while fetching passenger details.", error);
    }
}

const GET_PassengerLogout = async (req, res) => {
    try {
        res.clearCookie("ecopass_passenger_token");
        return successResponse(res, 200, "Logged out successfully")
    } catch (error) {
        return errorResponse(res, 500, "Error while fetching passenger details.", error);

    }
}



module.exports = { POST_PassengerLogin, GET_PassengerDetails, GET_PassengerLogout }