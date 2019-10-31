import {PrivateMiddleware} from '../../../typings/koa'
import {Event} from "../../models/event";

export const getBalance: PrivateMiddleware = async (ctx, next) => {
    const globalEvents = await Event.find({
        type: { "$in" : ["welcome-bonus", "income"]},
        isGlobal: true
    });
    // TODO: do aggragation in a good faith
    let balance = 0
    for (const event of globalEvents) {
        balance += event.moneyChange || 0
    }
    const localEvents = await Event.find({
        targetUsers: {
            $elemMatch: {$eq: ctx.state.currentUser._id}
        },
        moneyChange: {$ne: null},
        isGlobal: false
    });
    for (const event of localEvents) {
        balance += event.moneyChange || 0
    }
    ctx.success({balance: balance})
}
