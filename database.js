const mongoose = require('mongoose')
const config = require('./config')
const User = require('./models/user')

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        console.info(`Mongoose: trying connect to ${config.MONGODB_URL}`)
        mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true})
            .then(() => {
                console.log('db connected')

                User.findOne({displayId: 'testid'}, (err, user) => {
                    if (err) {
                        return console.error(err)
                    }
                    if (!user) {
                        user = new User({
                            displayId: 'testid',
                            secretKey: 'jopa'
                        })
                        user.save()
                        console.log('test user created')
                        return
                    }
                    console.log('test user exists')
                })
            })
            .catch(() => {
                console.error('db connection failed')
            })
    }

    disconnect() {
        console.info('Disconnecting from db')
        mongoose.connection.close()
    }
}

module.exports = new Database()