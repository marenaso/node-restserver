const {request, response} = require("express")
const bcryptjs = require("bcryptjs")
const User = require("../models/user")


const getUser = async (req = request, res = response) => {
	//const {name = "No name", page = 1, limit = 10} = req.query

	const {limit = 5, from = 0} = req.query
	const filterActiveUsers = {status: true}
	const findUsers = User.find(filterActiveUsers).skip(Number(from)).limit(Number(limit))
	const countUsers = User.countDocuments(filterActiveUsers)

	const [totalUsers, users] = await Promise.all([
		countUsers,
		findUsers
	])

	res.json({totalUsers, users})
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

	res.json(user)

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

	res.json(user)
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