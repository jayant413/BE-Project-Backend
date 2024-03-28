
const JWT = require('jsonwebtoken');
const Conductor = require('../../models/conductor-info-model');
const { errorResponse } = require('../../helper/response-format');


const authCondutorMiddleware = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (cookies.ecopass_conductor_token) {
            const decodedToken = JWT.verify(cookies.ecopass_conductor_token, process.env.JWT_SECRET);

            const conductor = await Conductor.findById(decodedToken._id);

            if (!conductor) {
                res.clearCookie("ecopass_conductor_token");
                return errorResponse(res, 401, "Unauthorized access");
            }
            next();
        } else {
            return errorResponse(res, 400, "No token found while authorization")
        }
    } catch (error) {
        return errorResponse(res, 500, "Error while authorizing admin", error)
    }
};

module.exports = { authCondutorMiddleware };