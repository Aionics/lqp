import {DefaultContext, DefaultState, Middleware} from 'koa';
// import {Middleware} from '@koa/router'
import {IUser} from '../src/models/user'

export interface AppContext extends DefaultContext {
    success: (data: any) => void;
    fail: (code: number, error: Error | any) => void;
    render: (template: string, props?: any) => Promise<any>
}

export interface AppState extends DefaultState {
    currentUser?: IUser
}

export type AppMiddleware = Middleware<AppState, AppContext>

export interface PrivateState extends DefaultState {
    currentUser: IUser
}

export type PrivateMiddleware = Middleware<PrivateState, AppContext>
