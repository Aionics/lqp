module.exports = {
    port: process.env.port || 3000,
    db_connection: {
        address: process.env.MONGO_URL || 'mongodb://localhost/',
        db_name: 'low-quality-party'
    }
}
