const express = require("express");

const { registerAdmin, loginAdmin, logoutAdmin } = require("../../../controllers/admin-controller");
const { checkRegisterAdminInfo, checkLoginAdminInfo, checkRegisterPassengerInfo } = require("../../../middlewares/adminMiddleware");
const { createOrganization, getOrganizations } = require("../../../controllers/organization-controllers");
const authMiddleware = require("../../../middlewares/auth-middleware");

const { registerPassenger, getAllOrganizationPassengers } = require("../../../controllers/admin/ad-passenger-controller");
const { registerConductor, getAllOrganizationConductors } = require("../../../controllers/admin/ad-conductor-controller");
const { registerBus } = require("../../../controllers/admin/ad-bus-controller");
const { POST_RegisterBusRoute, GET_BusRoutes, DELETE_BusRoute, GET_RouteDetails, POST_RegisterSegmentTickets } = require("../../../controllers/admin/ad-bus-route-controller");

const adminRouter = express.Router();


// adminRouter.get("/:id",)

/* Admin */
adminRouter.post("/register", checkRegisterAdminInfo, registerAdmin)
adminRouter.post("/login", checkLoginAdminInfo, loginAdmin)
adminRouter.get("/logout", logoutAdmin)

/* Magage Organization */
adminRouter.post("/create-organization", authMiddleware, createOrganization)
adminRouter.get("/organizations", authMiddleware, getOrganizations)

/* Manage Passengers */
adminRouter.post("/register-passenger/:organizationId", authMiddleware, checkRegisterPassengerInfo, registerPassenger)
adminRouter.get("/get-oranization-all-passenger-details/:organizationId", authMiddleware, getAllOrganizationPassengers)

/* Manage Conductors */
adminRouter.post("/register-conductor/:organizationId", authMiddleware, registerConductor)
adminRouter.get("/get-oranization-all-conductor-details/:organizationId", authMiddleware, getAllOrganizationConductors)

/* Manage Buses */
adminRouter.post("/register-bus/:organizationId", authMiddleware, registerBus)

/* Manage Bus Routes */
adminRouter.get("/get-bus-routes/:organizationId", authMiddleware, GET_BusRoutes)
adminRouter.get("/get-bus-route-details/:routeId", authMiddleware, GET_RouteDetails)
adminRouter.put("/delete-bus-route/:organizationId/:routeId", authMiddleware, DELETE_BusRoute)
adminRouter.post("/register-bus-route/:organizationId", authMiddleware, POST_RegisterBusRoute)
adminRouter.post("/register-segment-tickets/:organizationId", authMiddleware, POST_RegisterSegmentTickets)



module.exports = adminRouter;