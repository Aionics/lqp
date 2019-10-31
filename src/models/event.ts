import {prop, getModelForClass, modelOptions, DocumentType} from '@typegoose/typegoose';
import {Schema} from "mongoose";

const userRef = {
    type: Schema.Types.ObjectId,
    ref: 'User'
}

@modelOptions({
    options: {customName: 'Event'},
    schemaOptions: {collection: 'events'}
})
class EventClass {
    @prop({required: true})
    public type!: string

    @prop({...userRef})
    public initiator?: Schema.Types.ObjectId

    @prop({default: false})
    public isGlobal?: boolean

    @prop()
    public moneyChange?: number
}

export type EventI = DocumentType<EventClass>
export const Event = getModelForClass(EventClass)
