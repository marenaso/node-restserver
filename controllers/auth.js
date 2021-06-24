const {request, response} = require("express")
const bcryptjs = require("bcryptjs")
const User = require("../models/user")
const {generateJWT} = require("../helpers/jwt")

const login = async (req = request, res = response) => {
	try {
		const {email, password} = req.body

		// Verify email exist
		const user = await User.findOne({email})
		if (!user) {
			return res.status(400).json({msg: "Email/Password invalid - email"})
		}
		// Is active user
		if (!user.status) {
			return res.status(400).json({msg: "Email/Password invalid - deactivated"})
		}
		// Validate password
		const isValidPassword = bcryptjs.compareSync(password, user.password)
		if (!isValidPassword) {
			return res.status(400).json({msg: "Email/Password invalid - password"})
		}

		// Generate JWT
		const token = await generateJWT(user.id)

		res.json({user, token})
	} catch (e) {
		console.log(e)
		return res.status(500).json({msg: "Internal server error"})
	}
}

module.exports = {login}