const { valid, topic } = require("./mockVariables");
const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

describe("JWT Server:", () => {
  const User = mongoose.connection.model("User");
  let token;

  afterEach(async () => {
    try {
      await mongoose.connection.dropCollection("users");
    } catch (error) {
      return true;
    }
  });

  afterAll(async () => {
    app.close();
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  describe("/wrong", () => {
    it("should return 404 on wrong extention", (done) => {
      request.get("/wrong").expect(404).end(done);
    });
  });

  describe("/api/users/register", () => {
    it("should allow a user to register", (done) => {
      request
        .post("/api/user/register")
        .set("content-type", "application/json")
        .send(valid.correctUserData)
        .expect(200)
        .end(() => {
          User.find((err, users) => {
            expect(users.length).toBe(1);
            done();
          });
        });
    });
    it("should store a bcrypt hashed password", (done) => {
      request
        .post("/api/user/register")
        .set("Content-Type", "application/json")
        .send(valid.correctUserData)
        .end(() => {
          User.find((err, users) => {
            expect(users[0].password).not.toBe(valid.correctUserData);
            expect(
              bcrypt.compareSync(
                valid.correctUserData.password,
                users[0].password
              )
            ).toBe(true);
            done();
          });
        });
    });
  });

  describe("/api/users/register_github", () => {
    it("should allow a user to register with github", (done) => {
      request
        .post("/api/user/register_github")
        .set("content-type", "application/json")
        .send(valid.correctGithubUserData)
        .expect(200)
        .end(() => {
          User.find((err, users) => {
            expect(users.length).toBe(1);
            done();
          });
        });
    });
  });

  describe.skip("/forum/post_topic", () => {
    it("should post a topic", (done) => {
      request
        .post("/forum/post_topic")
        .set("content-type", "application/json")
        .send(topic)
        .expect(200)
        .end(() => {
          User.find((err, users) => {
            expect(users.length).toBe(1);
            done();
          });
        });
    });
  });
});
