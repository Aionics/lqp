module.exports = {
    port: 4848,
    db_connection: {
        address: process.env.MONGO_URL || 'mongodb://localhost/',
        db_name: 'low-quality-party'
    }
}
