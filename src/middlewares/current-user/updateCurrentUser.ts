import {User} from "../../models/user"
import {PrivateMiddleware} from '../../../typings/koa'

export const updateCurrentUser: PrivateMiddleware = async (ctx, next) => {
    const {currentUser} = ctx.state
    const fieldsToUpdate = User.pickPublicFields(ctx.request.body)
    const updatedUser = await User.findByIdAndUpdate(
        currentUser._id,
        fieldsToUpdate,
        {new: true}
    )
    if (updatedUser) {
        ctx.success(updatedUser.toJSON())
    } else {
        ctx.fail(400, 'no_user_found')
    }
    return next()
}
