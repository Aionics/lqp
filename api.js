const express = require('express')
const api = express()
 
api.post('/', function (req, res) {
    res.send('nice to meet u')
})

module.exports = api