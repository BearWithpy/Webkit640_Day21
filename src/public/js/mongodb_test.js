// mongodb 3.x.x 버전으로 하면 되는데 , 5.x.x로 하면 안되는 현상 발생함
const { MongoClient } = require("mongodb")
const dotenv = require("dotenv")
dotenv.config({ path: ".env/.env.local" })

const dbUrl = process.env.DB
let db = null

MongoClient.connect(dbUrl, function (err, client) {
    if (err) throw err
    db = client.db("vehicle")

    if (db) {
        console.log("db 연결 성공!")
        const car = db.collection("car")
        car.findOne({}, function (findErr, carData) {
            if (findErr) throw err
            console.log(carData.name, carData.price, carData.company)
        })
        client.close()
    } else {
        console.log("db 연결 안됨!")
    }
})
