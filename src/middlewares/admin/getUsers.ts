import {AppMiddleware, PrivateMiddleware} from "../../../typings/koa";
import {calculateBalance} from "../../helpers/helpers";
import {User} from "../../models/user";

export const getUsers: AppMiddleware = async (ctx, next) => {
    const users = await User.find({displayName: {$ne: null}})
    ctx.success(users)
    return next()
}