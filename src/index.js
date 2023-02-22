const http = require("http")
const express = require("express")
const dotenv = require("dotenv")

const app = express()
const router = express.Router()
const server = http.createServer(app)
dotenv.config({ path: ".env/.env.local" })

app.set("port", process.env.PORT || 3001)

router.route("/").get((req, res) => {
    res.end("<h1>Hello World</h1>")
})

router.route("/test").get((req, res) => {
    res.end("<h1>Test Page!</h1>")
})

app.use("/", router)

server.listen(app.get("port"), () => {
    console.log("http://localhost:" + app.get("port") + " ...running")
})
