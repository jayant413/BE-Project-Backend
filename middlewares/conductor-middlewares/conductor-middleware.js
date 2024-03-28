const { errorResponse } = require("../../helper/response-format");



const CHECK_ConductorLoginDetials = async (req, res, next) => {

    try {

        const { email_id, password } = req.body;

        if (!email_id) return errorResponse(res, 400, "Email address is required");
        if (!password) return errorResponse(res, 400, "Password is required");

        next();
    } catch (error) {
        return errorResponse(res, 500, "Error while conductor login details validation")
    }
};


module.exports = { CHECK_ConductorLoginDetials }