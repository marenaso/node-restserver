const {Router} = require("express")
const {check} = require("express-validator")
const router = Router()

const {login} = require("../controllers/auth")
const {validateFields} = require("../middlewares/field-validator")


router.post("/login", [
	check("email", "Email cannot be empty").isEmail(),
	check("password", "Password cannot be empty").notEmpty(),
	validateFields
], login)


module.exports = router