const JWT = require("jsonwebtoken");

const { errorResponse } = require("../../helper/response-format");
const Passenger = require("../../models/passanger-info-model");


const authPassengerMiddleware = async (req, res, next) => {
    try {
        const { ecopass_passenger_token } = req.cookies;
        if (ecopass_passenger_token) {
            const decodedToken = JWT.verify(ecopass_passenger_token, process.env.JWT_SECRET);

            const passenger = await Passenger.findById(decodedToken._id);

            if (!passenger) {
                res.clearCookie("ecopass_passenger_token");
                return errorResponse(res, 401, "Unauthorized access");
            }
            next();
        } else {
            return errorResponse(res, 400, "No token found while authorization")
        }
    } catch (error) {
        return errorResponse(res, 500, "Error while passenger authentication.", error);
    }
};

module.exports = { authPassengerMiddleware }