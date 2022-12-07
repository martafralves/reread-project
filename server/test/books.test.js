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
    it("should return a SINGLE book", async () => {
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

 /* describe("POST /api/books", () => {
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
  });*/

  describe("GET /api/books/find/:id", () => {
    it("should return books from user", async () => {
      const res = await request(app).get(
        "/api/books/find/638f220a69f167ee3e1662b0"
      );
      expect(res.statusCode).toBe(200);
    });
    it('Should return an array', async() => {
        const res = await request(app).get(
            "/api/books/find/638f220a69f167ee3e1662b0"
    )
    expect(Array.isArray(['books'])).toBe(true)
    })
  });


  describe("PUT /api/books/:id", () => {
    it("should update a book", async () => {
      const res = await request(app)
        .patch("/api/books/638f207569f167ee3e166295")
        .send({
          title: "Norwegian Wood",
          author: "Haruki Murikami",
          language: "English",
          delivery:"Not included in the price",
          status: "Available",
          condition: "Looks new",
          price: 10,
          description: "Testing updated description for this book"
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.price).toBe(10);

    });
  });

  /*describe("DELETE /api/books/:id", () => {
    it("should delete a book", async () => {
      const res = await request(app).delete(
        "/api/books/6390910f55a37cbfa2a12a95"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body).toBe('6390910f55a37cbfa2a12a95')
    });
  });*/
