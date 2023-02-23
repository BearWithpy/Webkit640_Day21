module.exports = (app, router) => {
    router.route("/signin_process").post((req, res) => {
        res.redirect("/html/signin.html")
    })

    router.route("/signin").post((req, res) => {
        const {
            userName: name,
            userID: id,
            userPassword: password,
            userPasswordConfirm: passwordConfirm,
        } = req.body
        console.log(req.body)

        res.redirect("/html/login.html")
    })

    router.route("/login").post((req, res) => {
        const { userID: id, userPassword: password } = req.body
        localDB = app.get("localDB")

        if (localDB) {
            let user = localDB
                .collection("users")
                .findOne(
                    { id: id, password: password },
                    async (err, result) => {
                        if (err) throw err
                        if (result) {
                            // session에 정보를 넘김
                            req.session.user = {
                                id: id,
                                name: result.name,
                            }
                            res.redirect("/product")
                        } else {
                            res.redirect("/html/login.html")
                        }
                    }
                )
        }

        // console.log(id, password)
    })

    router.route("/product").get((req, res) => {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf8",
        })
        if (req.session.user) {
            res.write(`<h1>${req.session.user.name}님, 환영합니다!!</h1>`)
            res.write(`<a href="/logout">Logout</a>`)
            res.end()
        } else {
            res.redirect("/html/login.html")
        }
    })

    router.route("/logout").get((req, res) => {
        req.session.user = null
        res.redirect("/html/login.html")
    })

    router.route("/test/car/list").get(async (req, res) => {
        const db = app.get("db")
        console.log("GET - /test/car/list 요청 됨.")
        res.writeHead(200, { "Content-Type": "text/html; charset=utf8" })
        res.write("<h1>Test page!</h1>")

        if (db) {
            const car = db.collection("car")
            car.find({}).toArray(function (findErr, carList) {
                if (findErr) throw err
                req.app.render("car/list", { carList }, function (err, html) {
                    res.end(html)
                })
            })
            console.log("출력 완료 !")
        } else {
            console.log("연결 안됨!")
        }
    })
}
