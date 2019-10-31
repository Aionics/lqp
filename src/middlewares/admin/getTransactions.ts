import {AppMiddleware} from '../../../typings/koa'
import {Event} from "../../models/event";
import {User} from "../../models/user";

export const getTransactions: AppMiddleware = async (ctx, next) => {
    const moneyChanges = await Event.find({moneyChange: {$ne: null}})
        .populate([{path: 'targetUsers', model: User}, 'initiator'])
    ctx.success(moneyChanges)
    return next()
}
