/* import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongod;

const connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  mongoose.set({ strictQuery: false });
  await mongoose.connect(uri);
};

const clearDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const closeDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase()); */

describe("schedule-service", () => {});
