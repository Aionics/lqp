import {User} from '../src/models/user'
import {Database} from '../src/database'
import {getLogger} from "../src/get-logger"
import usersConfig from './users.json'

const scriptsLogger = getLogger('scripts')

async function bootstrap() {
  scriptsLogger.info('Start bootstrapping users...')
  await Database.connect()

  const existingUsers = await User.find()
  if (existingUsers.length > 0) {
    scriptsLogger.info('Existing users found. Exiting!')
    await Database.disconnect()
    return
  }

  scriptsLogger.info(`Generating ${usersConfig.length} users including admins...`)

  for (const user of usersConfig) {
    const model = new User(user)
    await model.save()
  }

  await Database.disconnect()
  scriptsLogger.info('Users successfully generated!')
}

if (!module.parent) {
  bootstrap().catch(scriptsLogger.error)
}
