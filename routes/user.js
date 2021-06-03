const {getUser, postUser, deleteUser, patchUser, putUser} = require("../controllers/user");
const {Router} = require('express')
const router = Router()

router.get("/", getUser)
router.post("/", postUser)
router.put("/:userId", putUser)
router.patch("/", patchUser)
router.delete("/", deleteUser)

module.exports = router