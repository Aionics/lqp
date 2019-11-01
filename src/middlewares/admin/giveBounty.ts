import {AppMiddleware, PrivateMiddleware} from "../../../typings/koa";
import {calculateBalance} from "../../helpers/helpers";
import {Event} from "../../models/event";
import {User} from "../../models/user";

export const giveBounty: AppMiddleware = async (ctx, next) => {
    const {displayName, amount} = ctx.request.body

    const targetUser = await User.findOne({
        displayName: {$regex: new RegExp("^" + displayName.toLowerCase(), "i")}
    })

    const bountyEvent = new Event({
        type: 'bounty',
        targetUsers: [targetUser],
        moneyChange: amount
    })
    await bountyEvent.save()
    ctx.success(bountyEvent.toObject())
    return next()
}