const {Schema, model} = require('mongoose')
const {PARTY_CONSTANTS} = require(__base + 'config')
const user_schema = new Schema({
    id: String,
    money: {type: Number, default: PARTY_CONSTANTS.WELCOME_BONUS}
})

user_schema.methods.income = function() {
    this.money += PARTY_CONSTANTS.INCOME_AMOUNT
}

module.exports = model('User', user_schema)