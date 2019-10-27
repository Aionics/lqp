const {Schema, model} = require('mongoose')
const {PARTY_CONSTANTS} = require(__base + 'config')

const event_schema = new Schema({
    type: String,
    initiated_by: {type: Schema.Types.ObjectId, ref: 'User'},
    affected_to: [{type: Schema.Types.ObjectId, ref: 'User'}],
    extras: Object
})

module.exports = model('User', user_schema)