const express = require("express");
const adminRouter = require("./admin-routes/admin-route");
// const passengerRouter = require("./passenger-route");
const conductorRouter = require("./conductor-routes/conductor-route");

const v1Router = express.Router();



v1Router.use("/admin", adminRouter);
// v1Router.use("/passenger", passengerRouter);
v1Router.use("/conductor", conductorRouter)







module.exports = v1Router;