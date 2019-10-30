const privateApi = require('express')()
const User = require('../models/user')


privateApi.get('/user', (req, res) => {
    return res.jsoncb(null, req.currentUser)
})
privateApi.patch('/user', async (req, res) => {
    console.log(req.body.user)
    const updatedUser = await User.findByIdAndUpdate(req.currentUser._id, req.body.user)
    return res.jsoncb(null, updatedUser)
})

module.exports = privateApi