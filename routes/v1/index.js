const express = require("express");
const adminRouter = require("./admin-route");
const passengerRouter = require("./passenger-route");
const busRouter = require("./bus-route");

const v1Router = express.Router();



v1Router.use("/admin", adminRouter);
v1Router.use("/passenger", passengerRouter);
v1Router.use("/bus", busRouter);







module.exports = v1Router;