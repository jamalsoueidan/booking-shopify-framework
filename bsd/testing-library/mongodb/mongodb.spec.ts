import mongoose from "mongoose";

require('./mongodb.jest')

describe('mongodb testing library', () => {
  it("should be connected", async () => {
    expect(mongoose.connection.readyState).toBe(1)
  });
})