const { valid, topic } = require("./mockVariables");
const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");

const User = mongoose.connection.model("User");

afterEach(async () => {
  try {
    await mongoose.connection.dropCollection("users");
  } catch (error) {
    return true;
  }
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

describe("/forum/post_topic", () => {
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
