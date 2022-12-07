const {MongoMemoryServer} = require('mongodb-memory-server')
const mongoose = require('mongoose')


module.exports.mockDBconnect = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = await MongoMemoryServer.getUri();

    await mongoose.connect(mongoUri, {dbName: 'testingDB'})
    console.log('Mongo DB Mock successfully connected');
}
