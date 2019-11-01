import {AppMiddleware} from "../../../typings/koa";
import {Event} from "../../models/event";

export const wipeEvents: AppMiddleware = async (ctx, next) => {
    const {secret_phrase} = ctx.request.body
    if (secret_phrase === "omae_wa_mou_shindeiru") {
        await Event.deleteMany({})
        ctx.success('WIPED')
        return next()
    }
    ctx.fail(403, 'go fk urself <3')
    return next()
}