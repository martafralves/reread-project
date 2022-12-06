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


  describe("GET /api/books", () => {
    it("should return all books", async () => {
      const res = await request(app).get("/api/books");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });


  describe("GET /api/books/search/:id", () => {
    it("should return a book", async () => {
      const res = await request(app).get(
        "/api/books/search/638f207569f167ee3e166295"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe("Norwegian Wood");
      expect(res.body.author).toBe("Haruki Murikami");
    });
    it('Should return 401 if book doesnt exist', async() => {
        const res = await request(app).get(
            '/api/books/1235543'
        )
        expect(res.statusCode).toBe(401)
    })
  });

  describe("POST /api/books", () => {
    it("should add a new book for sale", async () => {
      const token = process.env.TEST_TOKEN
  
      const response = await request(app)
        .post("/api/books")
        .send({
          title: "Test Book",
          author: "Test author",
          price: '7',
          condition: 'brand new',
          delivery:'included',
          description: 'This is the test book',
          status: 'Available',
          language: 'English',
          user: '638f220a69f167ee3e1662b0'
        })
        .set({
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        });
  
      expect(response.statusCode).toBe(200);
    });
    it('should throw a 400 error if missing required fields', async() => {
        const token = process.env.TEST_TOKEN

        const response = await request(app)
        .post("/api/books")
        .send({
          title: "Testing",
          author: "Test author",
          price: '7',
          condition: 'brand new',
          language: 'English',
          user: '638f220a69f167ee3e1662b0'
        })
        .set({
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        });
  
      expect(response.statusCode).toBe(400);
    });
  });


  