const { errorResponse } = require("../../helper/response-format");


const checkRegisterBusInfo = async (req, res, next) => {
    try {
        const { bus_number, route_name, route_number, conductor_name, } = req.body;

        const { organizationId } = req.params;

        if (!organizationId) return errorResponse(res, 400, "Organization Id is required");
        if (!bus_number) return errorResponse(res, 400, "Invalid bus number");
        if (!route_name) return errorResponse(res, 400, "Invalid route name");
        if (!route_number) return errorResponse(res, 400, "Invalid route number");
        if (!conductor_name) return errorResponse(res, 400, "Invalid conductor name");

        next();
    } catch (error) {
        return errorResponse(res, 500, "Error in bus registration middleware");
    }
};

module.exports = { checkRegisterBusInfo };
