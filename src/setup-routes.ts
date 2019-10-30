import Koa from 'koa'
import Router from '@koa/router'
import {AppContext, AppState, PrivateState} from "../typings/koa"

import {login} from "./middlewares/login/login"
import {getCurrentUser} from "./middlewares/current-user/getCurrentUser"
import {requireUserLogin} from "./middlewares/login/requireUserLogin"
import {updateCurrentUser} from "./middlewares/current-user/updateCurrentUser"

export function setupRoutes(app: Koa<AppState, AppContext>) {
    const rootRouter = new Router<AppState, AppContext>();
    rootRouter.get('/', async (ctx, next) => {
        await ctx.render('index')
        return next()
    });
    app.use(rootRouter.routes())
    app.use(rootRouter.allowedMethods())

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
    app.use(privateApiRouter.routes())
    app.use(privateApiRouter.allowedMethods())
}
