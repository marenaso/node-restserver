const {Schema, model} = require("mongoose")


const userSchema = new Schema({
	name: {
		type: String,
		required: [true, "name is required"]
	},
	email: {
		type: String,
		required: [true, "email is required"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "password is required"]
	},
	img: {
		type: String,
		required: false
	},
	role: {
		type: String,
		enum: ["ADMIN_ROLE", "USER_ROLE"],
		default: "USER_ROLE"
	},
	status: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	}
})

module.exports = model("user", userSchema)