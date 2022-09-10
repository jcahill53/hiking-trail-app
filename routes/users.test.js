const request = require("supertest");
const server = require("../server");

jest.mock("../dataInterface/users");
const userData = require("../dataInterface/users");

// register a user
describe("/users routes", () => {

  describe("POST /users/register", () => {
    it("should return a message with a newObjectId on success", async () => {
      userData.create.mockResolvedValue({
        "newObjectId":"630e6f5376fee74a15fbb7fe",
        "name":"Sylvia Smith",
        "email":"ssmith3@gmail.com",
        "password":"$2a$10$E2sZAuhIn6fZ2rI2f3OtBO2ncYuyV11snZY5pd3MNVYRz7HZ00EEO"
      });
      const res = await request(server)
            .post("/users/register")
            .send({ "name":"Sylvia Smith",
                    "email":"ssmith3@gmail.com",
                    "password":"$2a$10$E2sZAuhIn6fZ2rI2f3OtBO2ncYuyV11snZY5pd3MNVYRz7HZ00EEO" },
            );
      expect(res.statusCode).toEqual(200);
      expect(res.body.newObjectId).toBeDefined();
      expect(res.body.Error).not.toBeDefined();
    });
    it("should return a status code of 404 on failure", async () => {
      userData.create.mockResolvedValue({error: "Something went wrong. Please try again."});
      const res = await request(server).post('/users/register');
      expect(res.statusCode).toEqual(404);
    });
  });


//   login a user
  describe("POST /users/login", () => {
    it("should return an object with username & email on success", async () => {
      userData.findByCredentials.mockResolvedValue({
        "email":"slee@gmail.com",
        "password":"PW123"
      });
      const res = await request(server).post("/users/login");
      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toBeDefined();
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 404 on failure", async () => {
      userData.findByCredentials.mockResolvedValue({error: `No user found with email user3@gmail.com.`});
      const res = await request(server).post("/users/login");
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBeDefined();
    });
  });

});

