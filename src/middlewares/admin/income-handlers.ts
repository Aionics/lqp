import {AppMiddleware} from '../../../typings/koa'
import {Event} from "../../models/event";

export const startIncome: AppMiddleware = async (ctx, next) => {
    const startIncomeEvent = new Event({
        type: 'start-income'
    })
    await startIncomeEvent.save()
    ctx.success('income-started')
    return next()
}

export const stopIncome: AppMiddleware = async (ctx, next) => {
    await Event.deleteMany({
        type: 'start-income'
    })
    ctx.success('income-stopped')
    return next()
}
