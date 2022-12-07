const mongoose = require('mongoose')
const request = require('supertest')

const app = require("../server");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });


  describe("GET /api/users", () => {
    it("should return all users in an Array", async () => {
      const res = await request(app).get("/api/users");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(['users'])).toBe(true);
    });
  });

  