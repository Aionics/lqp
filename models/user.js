const {Schema, model} = require('mongoose')
const {PARTY_CONSTANTS} = require('../config')
const user_schema = new Schema({
    id: String,
    money: {type: Number, default: PARTY_CONSTANTS.WELCOME_BONUS},
    level: {type: Number, default: 1}
})

user_schema.methods.income = function(cb) {
    this.money += PARTY_CONSTANTS.INCOME_AMOUNT
    return cb(null, 'ok')
    this.save()
}

module.exports = model('User', user_schema)