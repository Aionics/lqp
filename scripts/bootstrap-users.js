const User = require('../models/user')
const db = require('../database')
const users = require('./users')

async function bootstrap() {
  const existingUsers = await User.find()

  if (existingUsers.length > 0) {
    console.log('Existing users found. Exiting!')
    db.disconnect()
    return
  }

  console.log(`Generating ${users.length} users including admins...`)

  for (const user of users) {
    const model = new User(user)
    await model.save()
  }

  db.disconnect()

  console.log('Users successfully generated!')
}

bootstrap().catch(console.error)
