import {prop, getModelForClass, modelOptions, DocumentType} from '@typegoose/typegoose';


@modelOptions({
    options: {customName: 'User'},
    schemaOptions: {collection: 'users'}
})
class UserClass {
    @prop()
    public displayId?: string

    @prop()
    displayName?: string

    @prop({required: true})
    secretKey!: string

    @prop({required: true})
    isAdmin!: boolean

    @prop()
    adminLogin!: string

    @prop()
    adminPassword!: string

    public static pickPublicFields(userFields: Partial<UserClass>) {
        return {
            displayName: userFields.displayName
        }
    }
}

export type UserI = DocumentType<UserClass>
export const User = getModelForClass(UserClass)
