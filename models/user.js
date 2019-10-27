const {Schema, model} = require('mongoose')

const user_schema = new Schema({
    id: String,
    money: Number
})

user_schema.methods.purchase = (cb) => {
    let user = this.model('User')
    user.money+=10
    cb()
}

module.exports = model('User', user_schema)