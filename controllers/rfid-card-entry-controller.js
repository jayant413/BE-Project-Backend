const RfidCard = require("../models/rfid-model");

const RfidCardEntry = async (req, res) => {
    const { rfid } = req.query;
    console.log(rfid);
    const rfidCardEntry = await new RfidCard({
        rfid: rfid
    }).save();

    console.log(rfidCardEntry);
}


module.exports = { RfidCardEntry }; 