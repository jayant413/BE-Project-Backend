const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const Administrator = require("./models/administor")


dotenv.config();
connectDB()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:
        // "http://localhost:3000", 
        true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.get("/", async function (req, res) {
    let name = "Jayant";
    let mobile_number = "8459299053";
    let email_id = "jayant@gmail.com";
    let aadhaar_no = "255081715441";

    // const admin = await new Administrator({ name, mobile_number, email_id, aadhaar_no }).save();

    res.send("<h1> Welcome to ecopass boarding System Backend</h1>")

    // res.status(200).json({
    //     message: "Successfully registered admin",
    //     admin: admin,
    //     result: true
    // })
})



app.get('*', function (req, res) {
    res.send("<h1> Welcome to ecopass boarding System</h1>")
})


app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${process.env.PORT}`.bgCyan.white)

})

