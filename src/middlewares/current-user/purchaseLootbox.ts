import {PrivateMiddleware} from '../../../typings/koa'
import {Event} from "../../models/event";
import {LOOTBOX_COST} from "../../constants";

export const purchaseLootbox: PrivateMiddleware = async (ctx, next) => {
    const {currentUser} = ctx.state
    const purchaseEvent = new Event({
        type: 'purchase-lootbox',
        initiator: currentUser,
        targetUsers: [currentUser],
        moneyChange: LOOTBOX_COST
    })
    await purchaseEvent.save()
    ctx.success(purchaseEvent.toObject())
    return next()
}
