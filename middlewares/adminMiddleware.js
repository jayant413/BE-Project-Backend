const { errorResponse } = require("../helper/response-format");



const checkRegisterAdminInfo = (req, res, next) => {
    try {
        const { name, email_id, mobile_number, aadhaar_no, password } = req.body;

        if (!name) return errorResponse(res, 400, "Name is Required")
        if (!email_id) return errorResponse(res, 400, 'Email is Required')
        if (!mobile_number) return errorResponse(res, 400, 'Mobile Number is Required')
        if (!aadhaar_no) return errorResponse(res, 400, 'Aadhaar Number is Required')
        if (!password) return errorResponse(res, 400, 'Password is Required')

        next();

    } catch (error) {
        return errorResponse(res, 500, "Error while admin registration middleware", error)
    }
}


module.exports = { checkRegisterAdminInfo }