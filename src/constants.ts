export const PORT = process.env.PORT || 5000
export const MONGODB_URL = process.env.MONGO_URL || 'mongodb://localhost/lqp_db'
export const IS_PRODUCTION = process.env.NODE_ENV !== 'development'

export const SESSION_COOKIE_KEY = 'secret_key'
export const SESSION_COOKIE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7