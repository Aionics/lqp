const app = require('express')()
const database = require('./database')
const config = require('./config')

app.get('/', (req, res) => {
    res.send('nice to meet u')
})

app.use('/api', require('./api'))

app.listen(config.port, () => {
    console.log(`listening on ${config.port}`)
})
