const {Schema, model} = require('mongoose')
const {PARTY_CONSTANTS} = require('../config')
const user_schema = new Schema({
    displayId: String,
    displayName: String,
    secretKey: {type: String, select: false},
})

user_schema.methods.income = function(cb) {
    this.money += PARTY_CONSTANTS.INCOME_AMOUNT
    return cb(null, 'ok')
    this.save()
}



module.exports = model('User', user_schema)