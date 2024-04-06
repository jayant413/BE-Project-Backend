const { errorResponse, successResponse } = require("../../helper/response-format");

const RfidCard = require("../../models/rfid-model");
const Bus = require("../../models/bus-model");
const BusRoute = require("../../models/bus-route-model");
const Passenger = require("../../models/passanger-info-model");



const POST_InsertRfidCardEntry = async (req, res) => {
    try {
        const { rfid } = req.body;

        const rfidCard = await RfidCard.findOne({ rfid: rfid });

        const busDetails = await Bus.findById('66059a56f0ad19a3a53360df');
        if (!busDetails) return errorResponse(res, 404, "Bus Not Found");

        const findEntryPlace = () => {
            for (let i = 0; i < busDetails.journey[0].length; i++) {
                let row = busDetails.journey[i];
                for (let j = row.length - 1; j >= 0; j--) {
                    if (currentTime >= row[j].createdAt) {
                        return row[j].stop;
                    }
                }
            }
        }


        let currentTime = Date.now();
        let entryPlace = await findEntryPlace();

        if (!rfidCard) {
            await new RfidCard({
                rfid: rfid,
                entries: [{
                    entryAt: currentTime,
                    status: "test"
                }]
            }).save();
            return successResponse(res, 200, "Rfid card registered successfully.")
        }

        let previousEntry = rfidCard.entries[0];


        const passengerDetails = await Passenger.findOne({ rfid_no: rfid });
        if (!passengerDetails) return errorResponse(res, 404, "Passenger Not Found");



        const busRouteDetails = await BusRoute.findById(busDetails.busRouteID);
        if (!busRouteDetails) return errorResponse(res, 404, "Bus Route Not Found");



        const findTicketPrice = (travelSegment) => {

            let tiketPrice = 0;

            busRouteDetails.source_to_destination.forEach((segment, index) => {
                if (segment.fromto === travelSegment) {
                    tiketPrice = segment.ticketPrice;
                    return;
                };
            });

            busRouteDetails.destination_to_source.forEach((segment, index) => {
                if (segment.fromto === travelSegment) {
                    tiketPrice = segment.ticketPrice;
                    return;
                };
            })

            return tiketPrice;
        }


        if (previousEntry.place === entryPlace) return successResponse(res, 200, "No amount deducted");



        if (previousEntry.status == 'in') {

            let travelSegment = `${previousEntry.place}-${entryPlace}`;
            let ticket = await findTicketPrice(travelSegment);

            passengerDetails.balance -= ticket;

            rfidCard.entries.unshift({
                place: entryPlace,
                status: "out",
                entryAt: `${currentTime}`
            })
        } else {
            rfidCard.entries.unshift({
                place: entryPlace,
                status: "in",
                entryAt: `${currentTime}`

            })
        }

        if (!passengerDetails.balance <= 0) {
            await passengerDetails.save();
            await rfidCard.save();
        } else {
            //  TODO:  handle zero balance
            console.log("Balance is zero")
        }

        return successResponse(res, 200, "Successfully inserted rfid card entry");
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Error inserting rfid card entry")
    }
}


module.exports = { POST_InsertRfidCardEntry }