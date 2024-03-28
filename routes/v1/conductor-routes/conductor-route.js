const express = require('express');

/*  Middlewares */
const { CHECK_ConductorLoginDetials } = require('../../../middlewares/conductor-middlewares/conductor-middleware');
const { authCondutorMiddleware } = require('../../../middlewares/conductor-middlewares/auth-conductor-middleware');

/* Controllers */
const { POST_ConductorLogin, GET_ConductorAssignedBus } = require('../../../controllers/conductor/cond-auth-controller');
const { POST_StartJourney, GET_CondBusRouteDetails } = require('../../../controllers/conductor/cond-journey-controller');


/* Router */
const conductorRouter = express.Router();



//  Conductor 
conductorRouter.get("/get-assignedBus", authCondutorMiddleware, GET_ConductorAssignedBus)
conductorRouter.post("/login", CHECK_ConductorLoginDetials, POST_ConductorLogin);

// Journey
conductorRouter.post("/start-journey", authCondutorMiddleware, POST_StartJourney);
conductorRouter.get("/get-bus-route-details/:routeId", authCondutorMiddleware, GET_CondBusRouteDetails)







module.exports = conductorRouter;

