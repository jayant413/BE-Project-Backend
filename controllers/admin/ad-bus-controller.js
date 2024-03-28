const { errorResponse, successResponse } = require("../../helper/response-format");
const Bus = require("../../models/bus-model");
const BusRoute = require("../../models/bus-route-model");
const Conductor = require("../../models/conductor-info-model");
const Organization = require("../../models/organization-modal");
const JWT = require("jsonwebtoken")

const POST_RegisterBus = async (req, res) => {
    try {
        const { bus_number, route_name, route_number, conductor_name, } = req.body;
        const { organizationId } = req.params;

        const organization = await Organization.findById(organizationId);
        const route = await BusRoute.findOne({ route_number: route_number });
        const conductor = await Conductor.findOne({ name: conductor_name });


        if (!organization) return errorResponse(res, 404, "Organization not found");
        if (!route) return errorResponse(res, 404, "Route details not found");
        if (!conductor) return errorResponse(res, 404, "Conductor details not found");

        const RegisteredBus = await new Bus({
            busNumber: bus_number,
            routeName: route_name,
            routeNumber: route_number,
            conductorName: conductor_name,
            busRouteID: route._id,
            conductorID: conductor._id
        }).save();

        route.bussesOnRoute.push(RegisteredBus._id);
        conductor.busId = RegisteredBus._id;
        organization.buses.push(RegisteredBus._id);

        await Promise.all([organization.save(), route.save(), conductor.save()]);

        return successResponse(res, 200, "Bus details registered sucessfully", { RegisteredBus: RegisteredBus })
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Error while bus registration", error)
    }
}

const GET_OrganizationBuses = async (req, res) => {
    try {
        const { organizationId } = req.params;
        const organization = await Organization.findById(organizationId);

        if (!organization) {
            return errorResponse(res, 404, "Organization not found");
        }

        const bussId = organization.buses;

        const busDetails = await Bus.find({ _id: { $in: bussId } });


        return successResponse(res, 200, "Organizaion's bus's details fetched successfully", { busDetails: busDetails });
    } catch (error) {
        return errorResponse(res, 500, "Error while fetching organization buses", error)
    }
}

module.exports = { POST_RegisterBus, GET_OrganizationBuses };



