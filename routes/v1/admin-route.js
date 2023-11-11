const express = require("express");

const { registerAdmin, loginAdmin, logoutAdmin } = require("../../controllers/admin-controller");
const { checkRegisterAdminInfo, checkLoginAdminInfo } = require("../../middlewares/adminMiddleware");
const { createOrganization, getOrganizations } = require("../../controllers/organization-controllers");
const authMiddleware = require("../../middlewares/auth-middleware");

const adminRouter = express.Router();


adminRouter.get("/:id",)

adminRouter.post("/register", checkRegisterAdminInfo, registerAdmin)
adminRouter.post("/login", checkLoginAdminInfo, loginAdmin)
adminRouter.get("/logout", logoutAdmin)

adminRouter.post("/create-organization", authMiddleware, createOrganization)
adminRouter.get("/organizations", authMiddleware, getOrganizations)




module.exports = adminRouter;