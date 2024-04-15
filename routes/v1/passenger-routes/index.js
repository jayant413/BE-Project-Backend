const express = require('express');

const { POST_PassengerLogin, GET_PassengerDetails } = require('../../../controllers/passenger/pass-auth-controller');
const { authPassengerMiddleware } = require('../../../middlewares/passenger-middlewares');
const { GET_ConductorLogout } = require('../../../controllers/conductor/cond-auth-controller');
const { POST_PassengerPayment, GET_PassengerPaymentStatus } = require('../../../middlewares/passenger-middlewares/passenger-payment-controller');
const { GET_TravelLogs } = require('../../../controllers/passenger/pass-controller');


const passengerRouter = express.Router();


// passenger authorization
passengerRouter.post('/login', POST_PassengerLogin);
passengerRouter.get('/get-passengerDetails', authPassengerMiddleware, GET_PassengerDetails)
passengerRouter.get('/logout', authPassengerMiddleware, GET_ConductorLogout)


// passenger payment 
passengerRouter.post('/payment', authPassengerMiddleware, POST_PassengerPayment)
passengerRouter.get('/payment/validate/:merchantTransactionId', authPassengerMiddleware, GET_PassengerPaymentStatus)

// travel logs 
passengerRouter.get('/travel-logs', authPassengerMiddleware, GET_TravelLogs);





module.exports = passengerRouter;