const { errorResponse, successResponse } = require("../../helper/response-format");
const Bus = require("../../models/bus-model");
const BusRoute = require("../../models/bus-route-model");

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

        if (busRoute.route_name == journeyRoute) {
            const startingPoint = busRoute.all_stops[0];
            const newJourney = [{
                stop: startingPoint,
            }]
            bus.journey.push(newJourney);
        } else if (busRoute.reverse_route_name == journeyRoute) {
            const startingPoint = busRoute.all_stops[busRoute.all_stops.length - 1];
            const newJourney = [{
                stop: startingPoint,
            }];
            bus.journey.push(newJourney);
        } else {
            return errorResponse(res, 404, "Route not found");
        }

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

module.exports = { POST_StartJourney, GET_CondBusRouteDetails }