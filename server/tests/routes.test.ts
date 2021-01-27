import  {mock} from "./mockVariables";
import app from "../index";
import supertest from "supertest"
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken";
import {Iuser} from '../models/user.model'
import {Itopic} from '../models/topic.model'

const request = supertest(app);
const SUPER_SECRET_KEY = process.env.TOKEN_SECRET;
 
describe("Server:", () => {

  const url= process.env.MONGO_TEST_URL;
  beforeAll(async () => {
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  const User = mongoose.connection.model("User");
  const Topic = mongoose.connection.model("Topic");
  let token:string;
  let id:string;

  afterEach(async () => {
    try {
      await mongoose.connection.dropCollection("users");
    } catch (error) {
      return true;
    }
  });

  afterAll(async () => {
    app.close();
    await mongoose.connection.dropCollection("topics");
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
        .send({...mock.valid.correctUserData})
        .expect(200)
        .end(() => {
          User.find((err, users:Iuser[]) => {
            expect(users.length).toBe(1);
            done();
          });
        });
    });
    it("should store a bcrypt hashed password", (done) => {
      request
        .post("/api/user/register")
        .set("Content-Type", "application/json")
        .send({...mock.valid.correctUserData})
        .end(() => {
          User.find((err, users:Iuser[]) => {
            expect(users[0].password).not.toBe(mock.valid.correctUserData);
            expect(
              bcrypt.compareSync(
                mock.valid.correctUserData.password,
                users[0].password
              )
            ).toBe(true);
            done();
          });
        });
    });
    it("should return an error registration data is incorrect", (done) => {
      request
        .post("/api/user/register")
        .set("Content-Type", "application/json")
        .send({...mock.valid.wrongUserData})
        .expect((res) => {
          expect(res.status).toBeGreaterThanOrEqual(400);
        })
        .end(done);
    });
  });

  describe("/api/users/register_github", () => {
    it("should allow a user to register with github", (done) => {
      request
        .post("/api/user/register_github")
        .set("content-type", "application/json")
        .send({...mock.valid.correctGithubUserData})
        .expect(200)
        .end(() => {
          User.find((err, users:Iuser[]) => {
            expect(users.length).toBe(1);
            done();
          });
        });
    });
  });

  describe("/api/user/login", () => {
    beforeEach(async () => {
      const hash = await bcrypt.hash(mock.valid.correctUserData.password, 10);
      await User.create({ ...mock.valid.correctUserData, password: hash });
    });
    it("should accept an email & password and return the user object", (done) => {
      request
        .post("/api/user/login")
        .set("Content-Type", "application/json")
        .send({
          email: mock.valid.correctUserData.email,
          password: mock.valid.correctUserData.password,
        })
        .expect(200)
        .end(done);
    });
    it("should return an error when trying to login with the wrong credentials", (done) => {
      request
        .post("/api/user/login")
        .set("Content-Type", "application/json")
        .send({
          email: mock.valid.correctUserData.email,
          password: mock.valid.wrongUserData.password,
        })
        .expect((res) => {
          expect(res.status).toBeGreaterThanOrEqual(400);
        })
        .end(done);
    });
    it("should return a valid access token on successful login", (done) => {
      request
        .post("/api/user/login")
        .set("Content-Type", "application/json")
        .send({
          email: mock.valid.correctUserData.email,
          password: mock.valid.correctUserData.password,
        })
        .expect(200)
        .expect((res:any) => {
          token = res.res.text;
        })
        .end(() => {
          User.find((err, users:Iuser[]) => {
            expect((jwt.verify(token, SUPER_SECRET_KEY))._id).toBe(String(users[0]._id));
            done();
          });
        });
    });
  });

  describe("/api/user/github", () => {
    beforeEach(async () => {
      const hash = await bcrypt.hash(mock.valid.correctUserData.password, 10);
      await User.create({ ...mock.valid.correctUserData, password: hash });
    });
  });

  describe("/api/user/profile", () => {
    beforeEach((done) => {
      User.create({
        ...mock.valid.correctUserData,
        password: bcrypt.hashSync(mock.valid.correctUserData.password, 10),
      }).then(() => {
        request
          .post("/api/user/login")
          .set("Content-Type", "application/json")
          .send({
            email: mock.valid.correctUserData.email,
            password: mock.valid.correctUserData.password,
          })
          .expect((res:any) => {
            token = res.res.text;
          })
          .end(done);
      });
    });
    it("should allow entry with correct token", (done) => {
      request
        .get("/api/user/profile")
        .set("authorization", token)
        .expect(200)
        .end(done);
    });
    it("should disallow entry with incorrect token", (done) => {
      request
        .get("/api/user/profile")
        .expect((res) => {
          expect(res.status).toBeGreaterThanOrEqual(400);
        })
        .end(done);
    });
  });

  describe("/forum/post_topic", () => {
    beforeEach((done) => {
      User.create({
        ...mock.valid.correctUserData,
        password: bcrypt.hashSync(mock.valid.correctUserData.password, 10),
      }).then(() => {
        request
          .post("/api/user/login")
          .set("Content-Type", "application/json")
          .send({
            email: mock.valid.correctUserData.email,
            password: mock.valid.correctUserData.password,
          })
          .expect((res:any) => {
            token = res.res.text;
          })
          .end(done);
      });
    });

    it("should post a topic", (done) => {
      request
        .post("/forum/post_topic")
        .set("authorization", token)
        .set("content-type", "application/json")
        .send({...mock.topic.correctTopic})
        .expect(200)
        .end(() => {
          Topic.find((err, topics:Itopic[]) => {
            expect(topics.length).toBe(1);
            done();
          });
        });
    });
    it("should not post an incorrect topic", (done) => {
      request
        .post("/forum/post_topic")
        .set("authorization", token)
        .set("content-type", "application/json")
        .send({...mock.topic.wrongTopic})
        .expect((res) => {
          expect(res.status).toBeGreaterThanOrEqual(400);
        })
        .end(done);
    });
    it("should return all topics", (done) => {
      request
        .get("/forum/allTopics")
        .expect(200)
        .end(() => {
          Topic.find((err, topics:Itopic[]) => {
            id = topics[0]._id;
            expect(topics.length).toBe(1);
            done();
          });
        });
    });
    it("should return topic with given ID", (done) => {
      request
        .get(`/forum/topic/${id}`)
        .expect((res) => {
          expect(res.body.title).toBe(mock.topic.correctTopic.title);
        })
        .end(done);
    });
  });
});
