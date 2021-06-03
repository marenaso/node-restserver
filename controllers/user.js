const {request, response} = require('express')

const getUser = (req = request, res = response) => {
    const {name = 'No name', page = 1, limit = 10} = req.query
    res.json({msg: "get User - cont", name, page, limit})
}

const postUser = (req, res = response) => {
    let body = req.body

    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: "Name is required"
        })
    } else {
        res.json({user: body})
    }
}

const putUser = (req = request, res = response) => {
    const userId = req.params.userId;
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