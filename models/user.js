const db = require('mongoose')

let Schema = db.Schema

let userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'name is required']
	},
	email: {
		type: String,
		required: [true, 'email is required']
	},
	password: {
		type: String,
		required: [true, 'password is required']
	},
	img: {
		type: String,
		required: false
	},
	role: {
		type: String,
		default: 'USER_ROLE'
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

module.exports = db.model('user', userSchema)