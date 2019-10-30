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
import {PORT} from "./src/constants"

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
        noCache: false,
        throwOnUndefined: true
    },
    globals: { title: 'My Page' },
    ext: '.html'
};
app.use(koaNunjucksRenderer('templates', nunjucksOptions))

setupRoutes(app)

app.listen(PORT, () => {
    serverLogger.info(`Server started at port ${PORT}`)
    Database.connect()
});
