const JWT = require('jsonwebtoken');
const Administrator = require('../models/administor-model');
const { errorResponse } = require('../helper/response-format');

const authMiddleware = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (cookies.token) {
            const decodedToken = JWT.verify(cookies.token, process.env.JWT_SECRET);

            const admin = await Administrator.findById(decodedToken._id);

            if (!admin) {
                res.clearCookie("token");
                return errorResponse(res, 401, "Unauthorized access")
            };
        } else {
            return errorResponse(res, 400, "No token found while authorization")
        }
        next()
    } catch (error) {
        return errorResponse(res, 500, "Error while authorizing admin", error)
    }
}

module.exports = authMiddleware