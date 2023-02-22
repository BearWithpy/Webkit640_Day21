const { MongoClient } = require("mongodb")
const dotenv = require("dotenv")
dotenv.config({ path: ".env/.env.local" })

const uri = process.env.DB
const client = new MongoClient(uri)

async function connectDB() {
    try {
        await client.connect()

        const db = client.db("vehicle")
        const car = db.collection("car")
        const cursor = car.find({}, { projection: { _id: false } })
        await cursor.forEach((data) =>
            console.log(`${data.name} ${data.company} ${data.price}`)
        )
    } finally {
        await client.close()
    }
}
connectDB().catch(console.dir)

exports.connectDB = connectDB
