const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')

const mongo = new MongoMemoryServer()

//connect to database
module.exports.connect = async () => {
    const uri = await mongo.getUri()
    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    await mongoose.connect(uri, mongooseOptions)
}

//disconnect and close
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongo.stop()
}

//clear the db
module.exports.clearDatabase = async() => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany()
    }
}