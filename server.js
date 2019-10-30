const express = require('express')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')

const config = require('./config')
const db = require('./database')

const app = express()

nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    noCache: process.env.NODE_ENV !== 'production'
})

app.use(express.static('static'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('trust proxy', 1)
app.use(session({
  keys: ['ooo spooky']
}))

function deepWrapAndCatch(fn) {
    return (req, res, next) => Promise.resolve(fn).catch(() => {
        res.jsoncb('wtf')
    })
}

app.use((req, res, next) =>
    Promise.resolve(next())
        .then(() => {
            console.log('SUCCESS')
        })
        .catch(() => {
            res.jsoncb('wtf')
        })
)

app.use((req, res, next) => {
    res.jsoncb = (err, result) => {
        if(err) {
            return res.json({
                err: err
            })
        }
        return res.json({
            err: null,
            result: result
        })
    }
    return next()
})

app.use('/api', require('./api/api'))
app.get('/', (req, res) => {
    req.session.user_id = 'anus'

    res.render('index.html')
})

app.use('/api', require('./api'))

app.listen(config.PORT, () => {
    console.log(`listening on ${config.PORT}`)
})
