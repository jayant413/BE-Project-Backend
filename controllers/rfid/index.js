const { errorResponse, successResponse } = require("../../helper/response-format");
const ObjectId = require('mongoose').Types.ObjectId;

const RfidCard = require("../../models/rfid-model");
const Bus = require("../../models/bus-model");
const BusRoute = require("../../models/bus-route-model");
const Passenger = require("../../models/passanger-info-model");



const POST_InsertRfidCardEntry = async (req, res) => {
    try {
        const { rfid } = req.body;

        const rfidCard = await RfidCard.findOne({ rfid: rfid });
        const busDetails = await Bus.findById('66059a56f0ad19a3a53360df');
        const passengerDetails = await Passenger.findOne({ rfid_no: rfid });
        const busRouteDetails = await BusRoute.findById(busDetails.busRouteID);

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
                    place: "First entry",
                    entryAt: currentTime,
                    status: "scanned"
                }]
            }).save();
            return successResponse(res, 200, "Rfid card registered successfully.")
        }

        if (busDetails.journeyStatus == "off") {
            rfidCard.entries.unshift({
                place: "Journey not started",
                status: "scanned",
                entryAt: `${currentTime}`,
                balance: passengerDetails.balance
            })
            await rfidCard.save();
            return successResponse(res, 200, "Rfid card scanned journey not started yet")
        };

        let previousEntry = rfidCard.entries[0];

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


        // if (previousEntry.place === entryPlace) return successResponse(res, 200, "No amount deducted");


        if (previousEntry.status == 'in') {

            const passengerInBus = busDetails.passengersInBus.find(pass => pass.passengerID.equals(new ObjectId(passengerDetails._id)));
            passengerInBus.outTime = `${currentTime}`;
            passengerInBus.outPlace = entryPlace;

            let travelSegment = `${previousEntry.place}-${entryPlace}`;
            let ticket = await findTicketPrice(travelSegment);

            passengerDetails.balance -= ticket;

            rfidCard.entries.unshift({
                place: entryPlace,
                status: "out",
                entryAt: `${currentTime}`,
                ticketPrice: ticket,
                balance: passengerDetails.balance
            })
        } else {
            busDetails.passengersInBus.push({
                passengerID: passengerDetails._id,
                rfidCard: rfid,
                inTime: `${currentTime}`,
                inPlace: entryPlace
            })
            rfidCard.entries.unshift({
                place: entryPlace,
                status: "in",
                entryAt: `${currentTime}`,
                balance: passengerDetails.balance
            })
        }

        if (!passengerDetails.balance <= 0) {
            await passengerDetails.save();
            await rfidCard.save();
            await busDetails.save();
        } else {
            //  TODO:  handle zero balance
            console.log("Balance is zero")
        }

        return successResponse(res, 200, `Successfully journey ${previousEntry.status == "in" ? "exited at" : "started from"} ${entryPlace}`);
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Error inserting rfid card entry")
    }
}


module.exports = { POST_InsertRfidCardEntry }