import {prop, getModelForClass, modelOptions, DocumentType, Ref} from '@typegoose/typegoose';
import {Schema} from "mongoose";
import {UserI} from "./user";

const userRef = {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
}

@modelOptions({
    options: {customName: 'Event'},
    schemaOptions: {collection: 'events'}
})
class EventClass {
    @prop({required: true})
    public type!: string

    @prop({...userRef})
    public initiator?: Ref<UserI>

    @prop([userRef])
    public targetUsers?: Ref<UserI>[]

    @prop({default: false})
    public isGlobal?: boolean

    @prop()
    public moneyChange?: number
}

export type EventI = DocumentType<EventClass>
export const Event = getModelForClass(EventClass)

 // [{ type: Schema.Types.ObjectId, ref: 'Person' }],