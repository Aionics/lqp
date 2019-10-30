const User = require('../models/user')

module.exports = {
    login: async (req, res, next) => {
        const {displayName, secretKey} = req.body
        if (!displayName || !secretKey) {
            return res.status(403).jsoncb('displayName and secretKey should be specified')
        }
        const user = await User.findOne({secretKey: secretKey})
        if (!user) {
            return res.status(400).jsoncb(`there is no user with secretKey '${secretKey}'`)
        }
        req.currentUser = user
        req.session.user_id = user._id
        next()
    },
    requireUserLogin: async (req, res, next) => {
        if (!req.currentUser) {
            console.log(1)
            const user_id = req.session.user_id
            if (!user_id) {
                return res.status(401).jsoncb(`Access denied`)
            }
            console.log(user_id)
            const user = await User.findById(user_id)
            if (!user) {
                return res.status(401).jsoncb(`Access denied`)
            }
            req.currentUser = user
            console.log(req.currentUser)

        }
        next()
    }
}