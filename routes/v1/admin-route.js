const express = require("express");
const { registerAdmin } = require("../../controllers/admin-controller");

const adminRouter = express.Router();


adminRouter.get("/:[id]",)
adminRouter.post("/register", registerAdmin)
adminRouter.post("/login",)




module.exports = adminRouter;