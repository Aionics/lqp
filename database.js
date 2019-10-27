const mongoose = require('mongoose')
const config = require('./config')

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(`${config.db_connection.address}${config.db_connection.db_name}`)
            .then(() => {
                console.log('db connected')
            })
            .catch(() => {
                console.error('db connection failed')
            })
    }
}

module.exports = new Database()