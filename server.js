const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const apiRouter = require("./routes")


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

app.use("/api", apiRouter)



app.get('/', function (req, res) {
    res.send("<h1> Welcome to ecopass boarding System</h1>")
})
app.get('*', function (req, res) {
    res.send("<h1> Welcome to ecopass boarding System</h1>")
})


app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${process.env.PORT}`.bgCyan.white)

})

