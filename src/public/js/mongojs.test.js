const mongojs = require("mongojs")
const db = mongojs("vehicle", ["car"])

db.car.find((err, data) => {
    console.log(data)
})
