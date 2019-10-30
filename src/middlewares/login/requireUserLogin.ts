import {User} from '../../models/user'
import {SESSION_COOKIE_KEY} from '../../constants'
import {AppMiddleware} from '../../../typings/koa'
import {getLogger} from "../../get-logger"

const loginLogger = getLogger('login')

export const requireUserLogin: AppMiddleware = async (ctx, next) => {
    if (!ctx.state.currentUser) {
        const secretKey = ctx.cookies.get(SESSION_COOKIE_KEY)
        loginLogger.info(`Trying access private api with secretKey: ${secretKey}`)
        if (!secretKey) {
            return ctx.fail(401, 'no_auth_cookie_found')
        }
        const user = await User.findOne({secretKey})
        if (!user) {
            return ctx.fail(401, 'bad_auth_cookie')
        }
        ctx.state.currentUser = user
    }
    return next()
}
