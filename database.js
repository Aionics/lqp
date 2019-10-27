const mongoose = require('mongoose')
const config = require('./config')

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        console.info(`Mongoose: trying connect to ${config.MONGODB_URL}`)
        mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true})
            .then(() => {
                console.log('db connected')
            })
            .catch(() => {
                console.error('db connection failed')
            })
    }
}

module.exports = new Database()