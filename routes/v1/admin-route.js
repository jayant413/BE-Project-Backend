const express = require("express");
const { registerAdmin } = require("../../controllers/admin-controller");
const { checkRegisterAdminInfo } = require("../../middlewares/adminMiddleware");

const adminRouter = express.Router();


adminRouter.get("/:[id]",)
adminRouter.post("/register", checkRegisterAdminInfo, registerAdmin)
adminRouter.post("/login",)




module.exports = adminRouter;