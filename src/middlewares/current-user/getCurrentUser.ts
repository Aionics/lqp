import {PrivateMiddleware} from '../../../typings/koa'

export const getCurrentUser: PrivateMiddleware = async (ctx, next) => {
    const {currentUser} = ctx.state
    ctx.success(currentUser.toJSON())
    return next()
}
