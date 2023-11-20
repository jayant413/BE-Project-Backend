const { errorResponse, successResponse } = require("../helper/response-format");
const JWT = require('jsonwebtoken');
const Administrator = require('../models/administor-model');
const Organization = require("../models/organization-modal");

const getOrganizations = async (req, res) => {
    try {
        const cookies = req.cookies;
        const decodedToken = JWT.verify(cookies.token, process.env.JWT_SECRET);

        const organizations = await Organization.find({ owner: decodedToken._id });

        if (organizations) return successResponse(res, 200, "Organization details fetched sucessfully", { organizations: organizations })

        else return errorResponse(res, 400, "Error while fetching organization details")

    } catch (error) {
        return errorResponse(res, 500, "Error while fetching organization details", error)
    }
}


const createOrganization = async (req, res) => {

    try {
        const { name } = req.body;
        const cookies = req.cookies;

        if (!name) return errorResponse(res, 401, "Organization name required", error)


        const decodedToken = JWT.verify(cookies.token, process.env.JWT_SECRET);
        const admin = await Administrator.findById(decodedToken._id);

        const organization = await new Organization({ name, owner: decodedToken._id }).save();

        admin.organization.push(organization._id);
        await admin.save();

        return successResponse(res, 200, "Organization created successfully", organization)
    } catch (error) {
        return errorResponse(res, 500, "Error while creating organization", error)
    }
}


module.exports = { createOrganization, getOrganizations }