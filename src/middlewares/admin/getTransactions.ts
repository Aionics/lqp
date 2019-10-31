import {AppMiddleware} from '../../../typings/koa'
import {Event} from "../../models/event";

export const getTransactions: AppMiddleware = async (ctx, next) => {
    const moneyChanges = await Event.find({moneyChange: {$ne: null}})
        .populate(['initiator', 'targetUsers'])
    ctx.success(moneyChanges)
    return next()
}
