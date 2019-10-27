module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGO_URL || 'mongodb://localhost/lqp_db',

    PARTY_CONSTANTS: {
        WELCOME_BONUS: 10,
        INCOME_AMOUNT: 10,
        INCOME_TIMER: 10
    }
}
