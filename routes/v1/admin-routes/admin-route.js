const express = require("express");

const { registerAdmin, loginAdmin, logoutAdmin } = require("../../../controllers/admin-controller");
const { checkRegisterAdminInfo, checkLoginAdminInfo, checkRegisterPassengerInfo } = require("../../../middlewares/adminMiddleware");
const { createOrganization, getOrganizations } = require("../../../controllers/organization-controllers");
const authMiddleware = require("../../../middlewares/auth-middleware");

const { registerPassenger, getAllOrganizationPassengers } = require("../../../controllers/admin/ad-passenger-controller");

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




module.exports = adminRouter;