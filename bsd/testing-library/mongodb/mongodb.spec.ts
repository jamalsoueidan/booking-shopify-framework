import mongoose from "mongoose";
import { clearDatabase, connect, disconnect } from "./mongodb";

beforeAll(async () => connect());
afterEach(async () => clearDatabase());
afterAll(async () => disconnect());

describe('mongodb testing library', () => {
  it("should be connected", async () => {
    expect(mongoose.connection.readyState).toBe(1)
  });
})