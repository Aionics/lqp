import {User} from '../../models/user'
import {SESSION_COOKIE_KEY, SESSION_COOKIE_MAX_AGE_MS} from '../../constants'
import {AppMiddleware} from '../../../typings/koa'
import {getLogger} from "../../get-logger"

const loginLogger = getLogger('login')


export const login: AppMiddleware = async (ctx, next) => {
    const {secretKey} = ctx.request.body
    loginLogger.info(`Trying login in with secretKey: ${secretKey}`)
    if (!secretKey) {
        return ctx.fail(400, 'displayName and secretKey should be specified')
    }
    const user = await User.findOne({secretKey})
    if (!user) {
        return ctx.fail(403, 'no user found by secretKey')
    }
    ctx.currentUser = user
    ctx.cookies.set(SESSION_COOKIE_KEY, user.secretKey, {
        signed: true,
        secure: false, // TODO: включать на прооде — там есть HTTPS
        httpOnly: true,
        overwrite: true,
        maxAge: SESSION_COOKIE_MAX_AGE_MS
    })
    ctx.success(user.toObject())
    return next()
}
