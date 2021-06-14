const Role = require("../models/role")

const isValidRole = async (role = "") => {
	const roleExist = await Role.findOne({name: role})
	if (!roleExist) throw new Error(`Role ${role} is not valid`)
}

module.exports = {
	isValidRole
}