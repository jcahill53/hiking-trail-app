const request = require("supertest");
const server = require("../server");

// Declare the jest will mock movieData. Must be before the require statement.
jest.mock("../dataInterface/comments");
const commentData = require("../dataInterface/comments")

describe("/comments routes", () => {

  beforeEach(() => {

  });
// GET ALL COMMENTS FROM THE COMMENTS COLLECTION
  describe("GET /comments", () =>{
    it("should return an array on success", async () => {
        commentData.getAllComments.mockResolvedValue(
            [
                {_id:"630e38064123aad9416bd843",
                  userId:"630e726e76fee74a15fbb802",
                  messageBody:"Parking was very full when I first arrived but was overflowing when I ...",
                  createDayTime:"07/12/2022",
                  updatedDayTime:"07/12/2022",
                  trailId:"630e32a920214d9fcc411d74",
                  date:"2022-08-30T16:17:10.482+00:00",
                  rateTrail:5}
            ]);

      const res = await request(server).get("/comments");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message on error", async () => {
      commentData.getAllComments.mockResolvedValue(null);

      const res = await request(server).get("/comments");

      expect(res.statusCode).toEqual(500);

    });
  });

  // GET A SPECIFIC COMMENT ID
  describe("GET /comments/:id", () =>{
    it("should return an array on success", async () => {
        commentData.getCommentById.mockResolvedValue(
            [
                {_id:"630e38064123aad9416bd843",
                  userId:"630e726e76fee74a15fbb802",
                  messageBody:"Parking was very full when I first arrived but was overflowing when I ...",
                  createDayTime:"07/12/2022",
                  updatedDayTime:"07/12/2022",
                  trailId:"630e32a920214d9fcc411d74",
                  date:"2022-08-30T16:17:10.482+00:00",
                  rateTrail:5}
            ]);

      const res = await request(server).get("/comments/630e38064123aad9416bd843");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message on error", async () => {
      commentData.getCommentById.mockResolvedValue(null);

      const res = await request(server).get("/comments/630e38064123aad9416bd843");

      expect(res.statusCode).toEqual(404);

    });
  });

});