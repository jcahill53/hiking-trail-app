const request = require("supertest");
const server = require("../server");

// Declare the jest will mock movieData. Must be before the require statement.
jest.mock("../dataInterface/hikingtrails");
const commentData = require("../dataInterface/hikingtrails")

describe("/comments routes", () => {

  beforeEach(() => {

  });

  describe("GET /", () =>{
    it("should return an array on success", async () => {
        commentData.getAllComments.mockResolvedValue(
            [
                {_id:"890", title:"One Day"}
            ]);

      const res = await request(server).get("/comments");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message on error", async () => {
      commentData.getAll.mockResolvedValue(null);

      const res = await request(server).get("/commnets");

      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("GET /:id", () =>{
    it("should return a single movie on success", async () => {
      expect(false).toEqual(true);
    });
    it("should return a status code of 404 if movie not found", async () => {
      expect(false).toEqual(true);
    });
  });
});