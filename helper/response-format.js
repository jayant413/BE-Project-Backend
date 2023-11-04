

const successResponse = (res, statusCode, message, data = {}) => {
    const responseObj = {
        success: true,
        message: message,
    };

    if (Object.keys(data).length > 0) {
        responseObj.data = data;
    }

    return res.status(statusCode).json(responseObj);
};

const errorResponse = (res, statusCode, message, error = "") => {
    const responseObj = {
        success: false,
        message: message,
    };

    if (Object.keys(error).length > 0) {
        responseObj.error = error;
    }

    return res.status(statusCode).json(responseObj);
}


module.exports = { successResponse, errorResponse };