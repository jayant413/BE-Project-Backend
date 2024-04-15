const { errorResponse, successResponse } = require("../../helper/response-format");
const Passenger = require("../../models/passanger-info-model");
const RfidCard = require("../../models/rfid-model");
const JWT = require("jsonwebtoken");

const GET_TravelLogs = async (req, res) => {
    const { ecopass_passenger_token } = req.cookies;
    const decodedToken = JWT.verify(ecopass_passenger_token, process.env.JWT_SECRET);
    const passenger = await Passenger.findById(decodedToken._id);

    try {
        const travelLogs = await RfidCard.findOne({ rfid: passenger.rfid_no });
        if (!travelLogs) throw new Error("Travel logs not found.")

        return successResponse(res, 200, "Passenger travel logs.", { travelLogs: travelLogs });

    } catch (error) {
        return errorResponse(res, 500, "Error while fetching passenger details.", error);
    }
}


module.exports = { GET_TravelLogs };