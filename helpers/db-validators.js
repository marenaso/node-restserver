const Role = require("../models/role")
const User = require("../models/user")

const isValidRole = async (role = "") => {
	const roleExist = await Role.findOne({name: role})
	if (!roleExist) throw new Error(`Role ${role} is not valid`)
}

const existingEmail = async (email = "") => {
	const existEmail = await User.findOne({email})
	if (existEmail) throw new Error(`Email ${email} already exist`)

}

const existingUser = async (id) => {
	const existUser = await User.findById(id)
	if (!existUser) throw new Error("User doesn't exist")

}

module.exports = {
	isValidRole,
	existingEmail,
	existingUser
}