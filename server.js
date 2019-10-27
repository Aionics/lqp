global.__base = __dirname + "/"

const app = require('express')()
const config = require('./config')
const db = require('./database')
const User = require('./models/user')

let user = new User({id: 'test'})
user.purchase({name: 'jopa', cost: 5}, (err, res) => {
    console.log(err, res)
})
console.log(user.purchased_items)


app.get('/', (req, res) => {
    res.send('nice to meet u')
})

app.use('/api', require('./api'))

app.listen(config.PORT, () => {
    console.log(`listening on ${config.PORT}`)
})
