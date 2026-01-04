import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { insertData } from '../Repository/addSetupData';
import { app } from "../app";
import request from 'supertest';

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri)
})

beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
    await insertData();
})

afterAll(async () => {
    await mongoose.connection.close();
    await mongo.stop();
})

global.signin = async () => {
  const email = "admin@test.com";
  const password = "Admin@123";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  if (!cookie) {
    throw new Error("Failed to get cookie from response");
  }
  return cookie;
};
