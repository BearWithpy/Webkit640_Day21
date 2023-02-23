// const http = require("http")
// const express = require("express")
// const dotenv = require("dotenv")

// const { MongoClient } = require("mongodb")

// // const connectDB = require("./public/js/mongodb.test")
// const uri = "mongodb://127.0.0.1"
// const client = new MongoClient(uri, { useUnifiedTopology: true })
// let db = null
// async function connectDB() {
//     try {
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect()
//         // Establish and verify connection
//         db = client.db("vehicle")
//         console.log("Connected successfully to server")
//     } finally {
//         // Ensures that the client will close when you finish/error
//         //await client.close();
//     }
// }

// const app = express()
// const router = express.Router()
// const server = http.createServer(app)

// dotenv.config({ path: ".env/.env.local" })

// app.set("port", process.env.PORT || 3001)
// app.set("views", __dirname + "/views")
// app.set("view engine", "ejs")

// router.route("/").get((req, res) => {
//     res.end("<h1>Hello World</h1>")
// })

// // let db = null

// router.route("/test/car/list").get(async (req, res) => {
//     res.end("<h1>Test Page!</h1>")
//     res.writeHead(200, { "Content-Type": "text/html; charset=utf8" })
//     res.write("<h1>Test page!</h1>")
//     if (db) {
//         const car = db.collection("car")
//         car.find({}).toArray(function (findErr, carData) {
//             if (findErr) throw err
//             req.app.render("car/list", { carList: carData }, (err, html) => {
//                 res.end(html)
//             })
//         })
//         console.log("출력 완료 !")
//     }
// })

// app.use("/", router)

// server.listen(app.get("port"), () => {
//     console.log("http://localhost:" + app.get("port") + " ...running")
//     // db = connectDB.connectDB().catch(console.dir)
//     connectDB().catch(console.dir)
// })

///////////////////////////////////////////////////////////////////
// 아래 코드는 mongodb 5.x.x에서 정상 작동 하지 않음

// 다시 한번 공부해 보기

const http = require("http")
const express = require("express")
const app = express()
const server = http.createServer(app)
const router = express.Router()
const { MongoClient } = require("mongodb")
const session = require("express-session")
const cookieParser = require("cookie-parser")

app.set("port", process.env.PORT || 3000)
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

const routerModule = require("./router.module")

app.use(cookieParser())
app.use(
    session({
        secret: "my key",
        resave: true,
        saveUninitialized: true,
    })
)

const uri = "mongodb://127.0.0.1"
const client = new MongoClient(uri, { useUnifiedTopology: true })
let db = null
let localDB = null

async function connectDB() {
    try {
        await client.connect()
        db = await client.db("vehicle")
        localDB = await client.db("local")

        console.log("Connected successfully to server")

        app.set("db", db)
        app.set("localDB", localDB)
    } finally {
        //await client.close();
    }
}

///////--------------------------------

routerModule(app, router)
app.use("/", router)

server.listen(app.get("port"), () => {
    console.log("http://localhost:" + app.get("port"))
    console.log("Node.js 서버 실행 중 ...")
    connectDB().catch(console.dir)
})
