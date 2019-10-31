import auth from 'basic-auth'
import {User} from '../../models/user'
import {AppMiddleware} from '../../../typings/koa'
import {getLogger} from "../../get-logger"

const loginLogger = getLogger('login')

export const requireAdminLogin: AppMiddleware = async (ctx, next) => {
    if (ctx.state.currentUser) {
        return next()
    }
    const credentials = auth(ctx.req)
    if (!credentials) {
        ctx.set('WWW-Authenticate', 'Basic realm="VOIDITE"')
        return ctx.fail(401, 'no_basic_auth_credentials')
    }
    const user = await User.findOne({
        adminLogin: credentials.name,
        adminPassword: credentials.pass
    })
    if (!user) {
        ctx.set('WWW-Authenticate', 'Basic realm="VOIDITE"')
        return ctx.fail(401, 'bad_basic_auth_credentials')
    }
    ctx.state.currentUser = user
    return next()
}
