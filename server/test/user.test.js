const mongoose = require('mongoose')
const request = require('supertest')
const User = require ( '../models/users.model.js' )

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

  describe("GET /api/users/:id", () => {
    it("should return a user", async () => {
      const res = await request(app).get("/api/users/638f220a69f167ee3e1662b0");

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('John Doe')
      expect(res.body.email).toBe('johndoe@gmail.com')
      expect(res.body.username).toBe('johndoe')
    });

    it("should return a 400 if no user found", async () => {
      const res = await request(app).get("/api/users/10982");
      expect(res.statusCode).toBe(400)
    });
  })


  describe("POST /users/login", () => {

    describe("when passed an email and password", () => {
     it('should respond with a 200 status code', async () => {
        const res = await request(app).post('/api/users/login')
        .send({
          email: process.env.EMAIL,
          password: process.env.PASSWORD
        })
        expect(res.statusCode).toBe(200)
     })
    it('should respond with a json object containing user info, including token', async() => {
        const res = await request(app).post('/api/users/login')
        .send({
          email: process.env.EMAIL,
          password: process.env.PASSWORD
      })
      expect(res.body.token).toBeDefined()
      expect(res.body.username).toBe('johndoe')
    })
    })
  
    describe("when the email or password is missing", () => {
      it('should return a 400 status code', async () => {
        const res = await request(app).post('/api/users/login')
        .send({
          email: process.env.EMAIL,
      })
        expect(res.statusCode).toBe(400)
      })
    })
  })
  
  //REGISTRATION TESTING
  describe("POST /api/users", () => {
    //Should add a new user to database status 201
    //If email already exists should throw a status 400
    //If any missing mandatory fields should throw status 400
    //
  })

  describe("PUT /api/users/:id", () => {
    it("should update a user", async () => {
      const res = await request(app)
        .patch("/api/users/638f220a69f167ee3e1662b0")
        .send({
          name: 'John Doe',
          username: 'johndoe1',
          email: 'johndoe@gmail.com',
          about: 'Hello, this is my about'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.username).toBe('johndoe1');
      expect(res.body.about).toBe('Hello, this is my about')
    });
    it('Should return a 400 if user not found', async() => {
      const res = await request(app)
      .patch("/api/users/7ee3e1662b0")
      .send({
        name: 'John Doe',
        username: 'johndoe1',
        email: 'johndoe@gmail.com',
        about: 'Hello, this is my about'
      });
        expect(res.statusCode).toBe(400)
    })
  });
