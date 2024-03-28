const { errorResponse, successResponse } = require("../../helper/response-format");
const BusRoute = require("../../models/bus-route-model");
const Organization = require("../../models/organization-modal");


const POST_RegisterBusRoute = async (req, res) => {
    try {
        const { route_name, route_number, stops_count, stops } = req.body;
        const { organizationId } = req.params;

        const organization = await Organization.findById(organizationId);
        if (!organization) return errorResponse(res, 404, "Organization not found", error);

        if (!route_name) return errorResponse(res, 404, "Route name is required");
        if (!route_number) return errorResponse(res, 404, "Route number is required");
        if (!stops_count) return errorResponse(res, 404, "Stops count is required");
        if (!stops) return errorResponse(res, 404, "Stops is required");

        let separatedRoute = route_name.split("-");
        let reverseRouteName = separatedRoute.reverse().join("-");

        const registerBusRoute = await new BusRoute({
            route_number: route_number,
            reverse_route_name: reverseRouteName,
            route_name: route_name,
            source: stops[0],
            destination: stops[stops.length - 1],
            number_of_stops: stops_count,
            all_stops: stops
        }).save();

        organization.busroutes.push(registerBusRoute._id);
        const savedOrganization = await organization.save();

        return successResponse(res, 200, "Successfully registered bus route", registerBusRoute)


    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Error while registering bus route", error)
    }
}

const GET_BusRoutes = async (req, res) => {
    try {

        const { organizationId } = req.params;
        const organization = await Organization.findById(organizationId);

        if (!organization) {
            return errorResponse(res, 404, "Organization not found");
        }

        const busroutesId = organization.busroutes;

        const busrouteDetails = await BusRoute.find({ _id: { $in: busroutesId } });

        return successResponse(res, 200, "Bus route's details accessed successfully", { busrouteDetails: busrouteDetails })

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Error while accessing bus route details", error);
    }

}


const DELETE_BusRoute = async (req, res) => {
    try {
        const { organizationId, routeId } = req.params;
        const organization = await Organization.findById(organizationId);


        if (!organization) {
            return errorResponse(res, 404, "Organization not found");
        }

        await Organization.findOneAndUpdate(
            { _id: organizationId },
            { $pull: { busroutes: routeId } },
            { new: true }
        );

        await BusRoute.findByIdAndDelete(routeId);

        return successResponse(res, 200, "Bus route has been deleted successfully");

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Error while deleting bus route details", error);
    }

}


const GET_RouteDetails = async (req, res) => {
    try {
        const { routeId } = req.params;

        const RouteDetails = await BusRoute.findById(routeId);

        if (!RouteDetails) throw new Error("Route not found");

        return successResponse(res, 200, "Route details accessed successfully", RouteDetails);
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Error while accessing bus route details", error);
    }
}

const POST_RegisterSegmentTickets = async (req, res) => {
    try {
        const { source_to_destination, destination_to_source } = req.body;
        const { routeId } = req.params;

        const route = await BusRoute.findById(routeId);

        if (!route) {
            return errorResponse(res, 404, "Bus Route not found");
        };

        route.source_to_destination = source_to_destination;
        route.destination_to_source = destination_to_source;
        const UpdatedRoute = await route.save();

        return successResponse(res, 200, "Segments registered successfully", UpdatedRoute);
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Error while updating ticket segments", error);
    }
};



module.exports = { GET_BusRoutes, GET_RouteDetails, POST_RegisterBusRoute, DELETE_BusRoute, POST_RegisterSegmentTickets };



