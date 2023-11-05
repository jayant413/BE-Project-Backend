const express = require("express");

const { registerAdmin, loginAdmin } = require("../../controllers/admin-controller");
const { checkRegisterAdminInfo, checkLoginAdminInfo } = require("../../middlewares/adminMiddleware");

const adminRouter = express.Router();


adminRouter.get("/:[id]",)
adminRouter.post("/register", checkRegisterAdminInfo, registerAdmin)
adminRouter.post("/login", checkLoginAdminInfo, loginAdmin)




module.exports = adminRouter;