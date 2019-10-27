const app = require('express')()
const config = require('./config')
const db = require('./database')

global.__base = __dirname + "/"

app.get('/', (req, res) => {
    res.send('nice to meet u')
})

app.use('/api', require('./api'))

app.listen(config.PORT, () => {
    console.log(`listening on ${config.PORT}`)
})
