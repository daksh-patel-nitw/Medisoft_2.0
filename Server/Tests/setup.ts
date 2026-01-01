import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { GlobalMetadataModel } from '../Models/GlobalMetadata';

const records2 = [
  { name: 'roles', content: ['doctor', 'laboratorist', 'nurse', 'pharmacist'] },
  { name: 'pid', content: 1 },
  { name: 'eid', content: 1 },
  { name: 'dep', content: ['orthopedic', 'neurologist', 'cardiologist', 'endocrinologist', 'gynecologist'] },
  { name: 'medicineType', content: ['tablet', 'capsule', 'injection', 'ointment', 'drop', 'inhaler', 'cream', 'gel', 'lotion', 'shampoo', 'spray', 'powder', 'mouthwash', 'paste', 'emulsion', 'bar', 'soap'] }
];
let mongo: MongoMemoryServer;
beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri)
    await GlobalMetadataModel.insertMany(records2);
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