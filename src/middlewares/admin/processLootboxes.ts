import {AppMiddleware} from '../../../typings/koa'
import {Event} from "../../models/event";

export const getPendingLootboxes: AppMiddleware = async (ctx, next) => {
    const pendingLootboxes = await Event.find({
        type: 'purchase-lootbox',
        'extras.received': false
    })
    ctx.success(pendingLootboxes)
    return next()
}

export const receiveLootbox: AppMiddleware = async (ctx, next) => {
    const {id} = ctx.request.body
    await Event.findByIdAndUpdate(id, {'extras.received': true})
    ctx.success('received')
    return next()
}
