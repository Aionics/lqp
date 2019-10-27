const {Schema, model} = require('mongoose')
const {PARTY_CONSTANTS} = require(__base + 'config')
const user_schema = new Schema({
    id: String,
    money: {type: Number, default: PARTY_CONSTANTS.WELCOME_BONUS},
    level: {type: Number, default: 1},
    purchased_items: {type: Array, default: []}
})

user_schema.methods.income = function(cb) {
    this.money += PARTY_CONSTANTS.INCOME_AMOUNT
    return cb(null, 'ok')
    this.save()
}

user_schema.methods.purchase = function(item, cb) {
    if (this.money < item.cost) {
        return cb('we require more minerals')
    }
    this.money -= item.cost
    this.purchased_items = this.purchased_items.push[item]
    this.save()
    return cb(null, 'ok')
}

module.exports = model('User', user_schema)