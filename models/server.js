const express = require("express")
const cors = require("cors")
const {dbConnection} = require("../database/config")

class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT
		this.userPath = "/api/users"
		this.authPath = "/api/auth"

		//Database
		this.dbConnection()

		//Middlewares
		this.middlewares()
		//Routes
		this.routes()
	}

	async dbConnection() {
		await dbConnection()
	}

	middlewares() {
		this.app.use(cors())
		this.app.use(express.json())
		this.app.use(express.static("public"))
	}

	routes() {
		this.app.use(this.userPath, require("../routes/user"))
		this.app.use(this.authPath, require("../routes/auth"))
	}

	listen() {
		this.app.listen(this.port, () => console.log(`Listening ${this.port}`))
	}
}

module.exports = Server