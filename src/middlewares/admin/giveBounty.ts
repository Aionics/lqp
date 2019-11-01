import {AppMiddleware, PrivateMiddleware} from "../../../typings/koa";
import {calculateBalance} from "../../helpers/helpers";
import {Event} from "../../models/event";

export const giveBounty: AppMiddleware = async (ctx, next) => {
    const {user_id, amount} = ctx.request.body

    const bountyEvent = new Event({
        type: 'bounty',
        targetUsers: [user_id],
        moneyChange: amount
    })
    await bountyEvent.save()
    ctx.success(bountyEvent.toObject())
    return next()
}