const {Schema, model} = require('mongoose')
const {PARTY_CONSTANTS} = require('../config')
const user_schema = new Schema({
    id: String,
    money: {type: Number, default: PARTY_CONSTANTS.WELCOME_BONUS},
    level: {type: Number, default: 1},
    isAdmin: {type: Boolean, default: false},
    displayId: {type: String},
    displayName: {type: String, default: ""},
    adminLogin: {type: String},
    adminPassword: {type: String},
    secretKey: {type: String}
})

user_schema.methods.income = function(cb) {
    this.money += PARTY_CONSTANTS.INCOME_AMOUNT
    return cb(null, 'ok')
    this.save()
}



module.exports = model('User', user_schema)