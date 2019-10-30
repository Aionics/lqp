import mongoose from 'mongoose'
import {MONGODB_URL} from "./constants"
import {getLogger} from "./get-logger"

const dbLogger = getLogger('db')

export class Database {
    public static connect() {
        dbLogger.info(`Trying to connect to database (url: ${MONGODB_URL})`)
        return mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
            .then(() => {
                dbLogger.info('Database connection successful')
            })
            .catch((err) => {
                dbLogger.error('Database connection failed')
            })
    }

    public static disconnect() {
        dbLogger.info('Disconnecting from database')
        return mongoose.connection.close()
    }
}
