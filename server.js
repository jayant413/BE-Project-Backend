const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const apiRouter = require("./routes")
const bodyParser = require("body-parser")
const path = require("path")


dotenv.config();
connectDB()

const app = express()
const secretEnv = process.env.SECRET_COOKIE

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:8080', 'https://ecopass-admin.vercel.app', 'http://192.168.132.107:3000', 'http://192.168.132.107:3001'];

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // origin: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));




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

