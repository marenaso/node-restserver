const mongoose = require("mongoose")

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_ATLAS, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})

		console.log("Database online")
	} catch (e) {
		console.log(e)
		throw new Error("Error with database")
	}
}

module.exports = {
	dbConnection
}