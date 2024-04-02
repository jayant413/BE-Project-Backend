const axios = require("axios");
const sha256 = require("sha256");
const uniqid = require("uniqid");
const JWT = require("jsonwebtoken");


const { errorResponse, successResponse } = require("../../helper/response-format");
const Passenger = require("../../models/passanger-info-model");


const MERCHANT_ID = "PGTESTPAYUAT";
const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const SALT_INDEX = 1;
const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
const APP_BE_URL = "http://localhost:3000";


const POST_PassengerPayment = async (req, res) => {
    const { amount } = req.body;
    const { ecopass_passenger_token } = req.cookies;
    const decodedToken = JWT.verify(ecopass_passenger_token, process.env.JWT_SECRET);

    try {
        let userId = "MUID123";
        let merchantTransactionId = uniqid();

        let normalPayLoad = {
            merchantId: MERCHANT_ID, //* PHONEPE_MERCHANT_ID . Unique for each account (private)
            merchantTransactionId: merchantTransactionId,
            merchantUserId: userId,
            amount: amount * 100, // converting to paise
            redirectUrl: `${APP_BE_URL}/${decodedToken._id}/payment/validate/${merchantTransactionId}`,
            redirectMode: "REDIRECT",
            mobileNumber: "9999999999",
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };

        // make base64 encoded payload
        let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
        let base64EncodedPayload = bufferObj.toString("base64");

        // X-VERIFY => SHA256(base64EncodedPayload + "/pg/v1/pay" + SALT_KEY) + ### + SALT_INDEX
        let string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
        let sha256_val = sha256(string);
        let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

        const response = await axios
            .post(
                `${PHONE_PE_HOST_URL}/pg/v1/pay`,
                {
                    request: base64EncodedPayload,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-VERIFY": xVerifyChecksum,
                        accept: "application/json",
                    },
                }
            );

        return successResponse(res, 200, "Payment portal.", response.data.data)


    } catch (error) {
        return errorResponse(res, 500, "Error while payment request");
    }
};


const GET_PassengerPaymentStatus = async (req, res) => {
    const { merchantTransactionId } = req.params;
    const { ecopass_passenger_token } = req.cookies;
    const decodedToken = JWT.verify(ecopass_passenger_token, process.env.JWT_SECRET);
    const passenger = await Passenger.findById(decodedToken._id);

    try {
        if (merchantTransactionId) {
            let statusUrl =
                `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/` +
                merchantTransactionId;

            let string =
                `/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId + SALT_KEY;
            let sha256_val = sha256(string);
            let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

            axios
                .get(statusUrl, {
                    headers: {
                        "Content-Type": "application/json",
                        "X-VERIFY": xVerifyChecksum,
                        "X-MERCHANT-ID": merchantTransactionId,
                        accept: "application/json",
                    },
                })
                .then(async function (response) {
                    if (response.data && response.data.code === "PAYMENT_SUCCESS") {
                        const transactionId = response.data.data.transactionId;
                        if (passenger.transactionIds[0] !== transactionId) {
                            passenger.transactionIds.unshift(transactionId);
                            passenger.balance += response.data.data.amount / 100;
                            await passenger.save();
                        };

                        return successResponse(res, 200, "Payment done successfully", response.data.data);
                    } else {
                        return errorResponse(res, 402, "Payment failed", response.data)
                    }
                })
                .catch(function (error) {
                    return errorResponse(res, 402, "Payment failed", error)
                });
        } else return errorResponse(res, 404, "MerchantId is not valid")
    } catch (error) {
        return errorResponse(res, 500, "Error while payment validation request");
    }
}

module.exports = { POST_PassengerPayment, GET_PassengerPaymentStatus };