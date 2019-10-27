const express = require('express')
const app = express()
 
app.get('/', (req, res) => {
    res.send('nice to meet u')
})

app.use('/api', require('./api'))

const port = 4884
app.listen(port, () => {
    console.log(`listening on ${port}`)
})