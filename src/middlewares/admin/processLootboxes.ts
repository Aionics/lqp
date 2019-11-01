import {AppMiddleware} from '../../../typings/koa'
import {Event} from "../../models/event";
import {User} from "../../models/user";

export const getPendingLootboxes: AppMiddleware = async (ctx, next) => {
    const pendingLootboxes = await Event.find({
        type: 'purchase-lootbox',
        'extras.received': false
    }).populate([{path: 'targetUsers', model: User}, 'initiator'])
    ctx.success(pendingLootboxes)
    return next()
}

export const receiveLootbox: AppMiddleware = async (ctx, next) => {
    const {id} = ctx.request.body
    await Event.findByIdAndUpdate(id, {'extras.received': true})
    ctx.success('received')
    return next()
}
