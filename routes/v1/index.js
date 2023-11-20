const express = require("express");
const adminRouter = require("./admin-routes/admin-route");
const passengerRouter = require("./passenger-route");

const v1Router = express.Router();



v1Router.use("/admin", adminRouter);
v1Router.use("/passenger", passengerRouter);







module.exports = v1Router;