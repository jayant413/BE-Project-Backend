const express = require('express');
const { POST_InsertRfidCardEntry } = require('../../../controllers/rfid');

const rfidRouter = express.Router();




rfidRouter.post('/insert', POST_InsertRfidCardEntry)





module.exports = rfidRouter;