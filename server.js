const app = require('express')()
const database = require('./database')
const config = require('./config')
const express = require('express')
const app = express()
const database = require('./database');
const config = require('./config')

app.get('/', (req, res) => {
    res.send('nice to meet u')
})

app.use('/api', require('./api'))

const port = config.PORT
app.listen(port, () => {
    console.log(`listening on ${port}`)
})
