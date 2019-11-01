import {PrivateMiddleware} from '../../../typings/koa'
import {Event} from "../../models/event";
import {LOOTBOX_COSTS} from "../../constants";
import {calculateBalance} from "../../helpers/helpers";

function getLootboxCost(tier: any): number {
    if (typeof tier === "number") {
        if (tier in LOOTBOX_COSTS) {
            return (LOOTBOX_COSTS as any)[tier]
        }
    }
    return -1
}

export const purchaseLootbox: PrivateMiddleware = async (ctx, next) => {
    const {currentUser} = ctx.state
    const {tier} = ctx.request.body || 1
    const userBalance = await calculateBalance(ctx.state.currentUser._id)
    const lootboxCost = getLootboxCost(tier)

    if (userBalance < lootboxCost) {
        ctx.fail(403, 'not enought money')
        return next()
    }

    const purchaseEvent = new Event({
        type: 'purchase-lootbox',
        initiator: currentUser,
        targetUsers: [currentUser],
        moneyChange: lootboxCost,
        extras: {
            tier: tier,
            received: false
        }
    })
    await purchaseEvent.save()
    ctx.success(purchaseEvent.toObject())
    return next()
}


