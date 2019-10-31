import Koa from 'koa'
import Router from '@koa/router'
import {AppContext, AppState, PrivateState} from "../typings/koa"

import {login} from "./middlewares/login/login"
import {getCurrentUser} from "./middlewares/current-user/getCurrentUser"
import {requireUserLogin} from "./middlewares/login/requireUserLogin"
import {updateCurrentUser} from "./middlewares/current-user/updateCurrentUser"
import {getBalance} from "./middlewares/current-user/getBalance"
import {startIncome, stopIncome} from "./middlewares/admin/income-handlers";
import {getTransactions} from "./middlewares/admin/getTransactions";
import {purchaseLootbox} from "./middlewares/current-user/purchaseLootbox";
import {requireAdminLogin} from "./middlewares/login/requireAdminLogin"
import {getPendingLootboxes, receiveLootbox} from "./middlewares/admin/processLootboxes";

export function setupRoutes(app: Koa<AppState, AppContext>) {
    const rootRouter = new Router<AppState, AppContext>();
    rootRouter.get('/', async (ctx, next) => {
        await ctx.render('index')
        return next()
    });
    app.use(rootRouter.routes())
    app.use(rootRouter.allowedMethods())

    const rootAdmin = new Router<AppState, AppContext>();
    rootAdmin.use(requireAdminLogin)
    rootAdmin.get('/admin', async (ctx, next) => {
        await ctx.render('admin')
        return next()
    });
    app.use(rootAdmin.routes())
    app.use(rootAdmin.allowedMethods())

    const apiRouter = new Router<AppState, AppContext>({
        prefix: '/api'
    });
    apiRouter.post('/login', login)
    app.use(apiRouter.routes())
    app.use(apiRouter.allowedMethods())

    const privateApiRouter = new Router<PrivateState, AppContext>({
        prefix: '/api/private'
    });
    privateApiRouter.use(requireUserLogin)
    privateApiRouter.get('/user', getCurrentUser)
    privateApiRouter.patch('/user', updateCurrentUser)
    privateApiRouter.post('/purchase-lootbox', purchaseLootbox)
    app.use(privateApiRouter.routes())
    app.use(privateApiRouter.allowedMethods())

    privateApiRouter.get('/balance', getBalance)

    const apiAdminRouter = new Router<AppState, AppContext>({
        prefix: '/api/admin'
    });
    apiAdminRouter.use(requireAdminLogin)
    apiAdminRouter.post('/start-income', startIncome)
    apiAdminRouter.post('/stop-income', stopIncome)
    apiAdminRouter.get('/transactions', getTransactions)
    apiAdminRouter.get('/lootboxes', getPendingLootboxes)
    apiAdminRouter.patch('/lootboxes', receiveLootbox)
    app.use(apiAdminRouter.routes())
    app.use(apiAdminRouter.allowedMethods())
}
