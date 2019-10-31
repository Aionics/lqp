import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import koaStatic from 'koa-static'
// @ts-ignore
import koaNunjucksRenderer from 'koa-nunjucks-async'
import {AppContext, AppState} from "./typings/koa"
import {setupRoutes} from "./src/setup-routes"
import {getLogger} from "./src/get-logger"
import {Database} from "./src/database"
import {INCOME_AMOUNT, INCOME_INTERVAL, IS_PRODUCTION, PORT, WELCOME_BONUS} from "./src/constants"
import {Event} from "./src/models/event";

const serverLogger = getLogger('server')
const app = new Koa<AppState, AppContext>();

app.keys = ['I hate this life'];
app.use(koaBodyParser());
app.use(koaLogger())

app.use(koaStatic('static'))

app.use((ctx, next) => {
    ctx.success = (data: any) => {
        ctx.status = 200
        ctx.body = {
            error: false,
            result: data
        }
    }
    ctx.fail = (code: number, error: Error | any) => {
        ctx.status = code
        ctx.body = {
            error: true,
            result: error
        }
    }
    return next()
})

const nunjucksOptions = {
    opts: {
        noCache: !IS_PRODUCTION,
        throwOnUndefined: true
    },
    globals: { title: 'My Page' },
    ext: '.html'
};
app.use(koaNunjucksRenderer('templates', nunjucksOptions))

setupRoutes(app)

async function tryIncome() {
    const startIncomeEvents = await Event.findOne({type: 'start-income'})
    if (!startIncomeEvents) {
        return
    }
    const incomeEvent = new Event({
        type: 'income',
        isGlobal: true,
        moneyChange: INCOME_AMOUNT
    })
    await incomeEvent.save()
}

setInterval(() => tryIncome().catch(serverLogger.error), 2 * 1000)

// TODO: google for 'create if not exists'
const welcomeBonusObject = {
    type: 'welcome-bonus',
    isGlobal: true,
    moneyChange: WELCOME_BONUS
}
Event.findOne(welcomeBonusObject, (err, welcomeBonusEvent) => {
    if (!welcomeBonusEvent) {
       new Event(welcomeBonusObject).save()
    }
})

// WIPE EVENTS
// Event.deleteMany({type: 'income'}, (err) => {
//     console.log(err)
// })
app.listen(PORT, () => {
    serverLogger.info(`Server started at port ${PORT}`)
    Database.connect()
});
