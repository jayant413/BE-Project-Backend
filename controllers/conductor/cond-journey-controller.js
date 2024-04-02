const { errorResponse, successResponse } = require("../../helper/response-format");
const JWT = require('jsonwebtoken');
const Bus = require("../../models/bus-model");
const BusRoute = require("../../models/bus-route-model");
const Conductor = require("../../models/conductor-info-model");

const POST_StartJourney = async (req, res) => {
    try {
        const { journeyRoute, busId } = req.body;

        if (!journeyRoute || !busId) {
            return errorResponse(res, 400, "journeyRoute and busId are required fields");
        }

        const busRoute = await BusRoute.findOne({
            $or: [
                { route_name: journeyRoute },
                { reverse_route_name: journeyRoute }
            ]
        });
        if (!busRoute) {
            return errorResponse(res, 404, "Route not found");
        }

        let bus = await Bus.findById(busId);
        if (!bus) {
            return errorResponse(res, 404, "Bus not found");
        }

        let currentTime = Date.now();
        let startingPoint;

        if (busRoute.route_name == journeyRoute) startingPoint = busRoute.all_stops[0];
        else if (busRoute.reverse_route_name == journeyRoute) startingPoint = busRoute.all_stops[busRoute.all_stops.length - 1];
        else return errorResponse(res, 404, "Route not found");

        const newJourney = [{
            stop: startingPoint,
            createdAt: currentTime
        }];

        bus.journey.unshift(newJourney);

        await bus.save();

        return successResponse(res, 200, "Started journey successfully", { busdetails: bus });
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Error while starting journey", error);
    }
}


const GET_CondBusRouteDetails = async (req, res) => {
    try {
        const { routeId } = req.params;
        const busRoute = await BusRoute.findById(routeId);

        if (!busRoute) return errorResponse(res, 404, "Route not found");

        return successResponse(res, 200, "BusRoute accessed succefully", { busRoute: busRoute });
    } catch (error) {
        return errorResponse(res, 500, "Error while getting route details", error);
    }
}

const GET_CheckNextStop = async (req, res) => {
    const cookies = req.cookies;
    const { source, destination } = req.params;
    const decodedToken = JWT.verify(cookies.ecopass_conductor_token, process.env.JWT_SECRET);
    try {
        const conductor = await Conductor.findById(decodedToken._id);
        if (!conductor) return errorResponse(res, 404, "Conductor not found");

        const bus = await Bus.findOne({ _id: conductor.busId });
        if (!bus) return errorResponse(res, 404, "Bus not found");

        const busRoute = await BusRoute.findOne({ _id: bus.busRouteID });
        if (!busRoute) return errorResponse(res, 404, "Bus route not found");

        let journeyDone = bus.journey[0].length;
        let toCheckStop = "";
        let currentTime = Date.now();

        if (source == busRoute.source) {
            toCheckStop = busRoute.all_stops[journeyDone];

        } else if (source == busRoute.destination) {
            toCheckStop = busRoute.all_stops[busRoute.all_stops.length - (journeyDone + 1)];
        }
        bus.journey[0].push({
            stop: toCheckStop,
            createdAt: currentTime
        });

        await bus.save();

        return successResponse(res, 200, "Checked next stop")
    } catch (error) {
        return errorResponse(res, 500, "Error while checking next stop", error);
    }
}


module.exports = { POST_StartJourney, GET_CondBusRouteDetails, GET_CheckNextStop, }