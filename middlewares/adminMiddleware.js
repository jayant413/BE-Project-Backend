const { errorResponse } = require("../helper/response-format");



const checkRegisterAdminInfo = (req, res, next) => {
    try {
        const { name, email_id, mobile_number, aadhaar_no, password } = req.body;

        if (!name) return errorResponse(res, 400, "Name is required");
        if (!email_id) return errorResponse(res, 400, 'Email is required');
        if (!mobile_number) return errorResponse(res, 400, 'Mobile Number is required');
        if (!aadhaar_no) return errorResponse(res, 400, 'Aadhaar Number is required');
        if (!password) return errorResponse(res, 400, 'Password is required');

        next();

    } catch (error) {
        return errorResponse(res, 500, "Error while admin registration middleware", error);
    }
}

const checkLoginAdminInfo = (req, res, next) => {
    try {
        const { email_id, mobile_number, password } = req.body;

        if (!(email_id || mobile_number)) return errorResponse(res, 400, 'Email or Mobile Number is required');
        if (!password) return errorResponse(res, 400, 'Password is required');

        next();
    } catch (error) {
        return errorResponse(res, 500, "Error while admin login middleware", error);
    }
}


module.exports = { checkRegisterAdminInfo, checkLoginAdminInfo }