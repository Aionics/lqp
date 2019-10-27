const app = require('express')()
const config = require('./config')
const db = require('./database')

app.get('/', (req, res) => {
    res.send('nice to meet u')
})

app.use('/api', require('./api'))

const port = config.PORT
app.listen(port, () => {
    console.log(`listening on ${port}`)
})
