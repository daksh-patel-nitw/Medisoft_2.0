import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { GlobalMetadataModel } from '../Models/GlobalMetadata';
import { insertData } from '../Repository/addSetupData';


let mongo: MongoMemoryServer;
beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri)
    insertData();
})

// beforeEach(async () => {
//     const collections = mongoose.connection.collections;
//     for (const key in collections) {
//         const collection = collections[key];
//         await collection.deleteMany({});
//     }
// })

afterAll(async () => {
    await mongoose.connection.close();
    await mongo.stop();
})