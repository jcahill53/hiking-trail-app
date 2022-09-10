const request = require("supertest");
const server = require("../server");

// Declare the jest will mock movieData. Must be before the require statement.
jest.mock("../dataInterface/parking");
const commentData = require("../dataInterface/parking")

describe("/parking routes", () => {

  beforeEach(() => {

  });
// GET ALL COMMENTS FROM THE COMMENTS COLLECTION
  describe("GET /parking", () =>{
    it("should return an array on success", async () => {
        commentData.getAll.mockResolvedValue(
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

      const res = await request(server).get("/parking");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message on error", async () => {
      commentData.getAll.mockResolvedValue(null);

      const res = await request(server).get("/parking");

      expect(res.statusCode).toEqual(500);

    });
  });


});