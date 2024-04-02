const express = require("express");
const adminRouter = require("./admin-routes");
const conductorRouter = require("./conductor-routes");
const passengerRouter = require("./passenger-routes");
const rfidRouter = require("./rfid-routes");

const v1Router = express.Router();



v1Router.use("/admin", adminRouter);
v1Router.use("/passenger", passengerRouter);
v1Router.use("/conductor", conductorRouter)
v1Router.use("/rfid", rfidRouter);







module.exports = v1Router;