import {PrivateMiddleware} from '../../../typings/koa'
import {Event} from "../../models/event";
import {calculateBalance} from "../../helpers/helpers";

export const getBalance: PrivateMiddleware = async (ctx, next) => {
    const balance = await calculateBalance(ctx.state.currentUser._id)
    ctx.success({balance: balance})
}
