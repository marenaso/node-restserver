const {request, response} = require("express")
const bcryptjs = require("bcryptjs")
const User = require("../models/user")


const getUser = (req = request, res = response) => {
	const {name = "No name", page = 1, limit = 10} = req.query
	res.json({msg: "get User - cont", name, page, limit})
}

const postUser = async (req, res = response) => {
	// Extract data body
	const {name, password, email, role} = req.body
	const user = new User({name, password, email, role})

	// Encrypt password
	const salt = bcryptjs.genSaltSync()
	user.password = bcryptjs.hashSync(password, salt)

	// Save user
	await user.save()

	res.json({
		msg: "post",
		user
	})

}

const putUser = async (req = request, res = response) => {
	const id = req.params.id
	const {_id, password, google, email, ...other} = req.body

	// Validate against DB
	if (password) {
		// Encrypt password
		const salt = bcryptjs.genSaltSync()
		other.password = bcryptjs.hashSync(password, salt)
	}

	const user = await User.findByIdAndUpdate(id, other)

	res.json({
		msg: "put User",
		id: user
	})
}

const patchUser = (req, res = response) => {
	res.json("put User")
}

const deleteUser = (req, res = response) => {
	res.json("delete User")
}

module.exports = {
	getUser,
	postUser,
	patchUser,
	putUser,
	deleteUser
}