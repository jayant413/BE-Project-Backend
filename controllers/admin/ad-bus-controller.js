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

        const RouteId = await BusRoute.find({ route_number: route_number });
        const ConductorId = await Conductor.find({ name: conductor_name });

        const RegisteredBus = await new Bus({
            busNumber: bus_number,
            routeName: route_name,
            routeNumber: route_number,
            conductorName: conductor_name,
            busRouteID: RouteId[0]._id,
            conductorID: ConductorId[0]._id
        }).save();

        organization.buses.push(RegisteredBus._id);

        await organization.save();

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



