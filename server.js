const express = require('express')
const nunjucks = require('nunjucks')

const config = require('./config')
const db = require('./database')

const app = express()

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

app.use(express.static('static'))

app.get('/', (req, res) => {
    res.render('index.html')
})

app.use('/api', require('./api'))

app.listen(config.PORT, () => {
    console.log(`listening on ${config.PORT}`)
})
