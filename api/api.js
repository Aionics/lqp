const api = require('express')()
const {login, requireUserLogin} = require('./middlewares')

api.post('/', (req, res) => {
    //test route
    res.send('nice to meet u')
})
api.post('/login', login, (req, res) => {
    return res.jsoncb(null, 'success')
})
api.post('/test', requireUserLogin, (req, res) => {
    res.send('ok')
})

api.use('/private', requireUserLogin, require('./private'))
module.exports = api