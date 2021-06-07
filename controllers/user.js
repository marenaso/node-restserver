const {request, response} = require("express")
const bcryptjs = require("bcryptjs")
const User = require("../models/user")
const {validationResult} = require("express-validator")

const getUser = (req = request, res = response) => {
	const {name = "No name", page = 1, limit = 10} = req.query
	res.json({msg: "get User - cont", name, page, limit})
}

const postUser = async (req, res = response) => {
	// Validate request errors
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(errors)
	}

	// Extract data body
	const {name, password, email, role} = req.body
	const user = new User({name, password, email, role})

	// Verify email
	const existEmail = await User.findOne({email})
	if (existEmail) {
		return res.status(400).json({msg: "Email already registered"})
	}

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

const putUser = (req = request, res = response) => {
	const userId = req.params.userId
	res.json({
		msg: "put User",
		id: userId
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