const {isValidRole, existingEmail, existingUser} = require("../helpers/db-validators")
const {validateFields} = require("../middlewares/field-validator")
const {check} = require("express-validator")
const {getUser, postUser, deleteUser, patchUser, putUser} = require("../controllers/user")
const {Router} = require("express")
const router = Router()

router.get("/", getUser)
router.post("/", [
	check("name", "Name is empty").not().isEmpty(),
	check("password", "Password length should be more than 6 chars").isLength({min: 6}),
	check("email", "E-mail is not valid").isEmail(),
	check("email").custom(existingEmail),
	//check("role", "Role is not valid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
	check("role").custom(isValidRole),
	validateFields
], postUser)

router.put("/:id", [
	check("id", "Is not a valid id").isMongoId(),
	check("id").custom(existingUser),
	check("role").custom(isValidRole),
	validateFields
], putUser)

router.patch("/", patchUser)
router.delete("/", deleteUser)

module.exports = router