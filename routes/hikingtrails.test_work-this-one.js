const request = require("supertest");
const server = require("../server");

// Declare the jest will mock hikingTrails. Must be before the require statement.
jest.mock("../dataInterface/hikingtrails");
const hikingData = require("../datainterface/hikingtrails");
const { ObjectId } = require("mongodb");

describe("/hikingtrail routes", () => {

  beforeEach(() => {

  });

  describe("GET /", () =>{
    it("should return an array on success", async () => {
      hikingData.getAll.mockResolvedValue([
            {_id:"890", name:"Hiking Loop" },
            {_id:"891", name:"Another Hiking Loop" },
            {_id:"892", name:"A Third Hiking Loop" },
            {_id:"893", name:"The Last Hiking Loop" }
        ]);
      const res = await request(server).get("/hikingtrails");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });

    it("should return an error message on error", async () => {
      hikingData.getAll.mockResolvedValue(null);
      const res = await request(server).get("/hikingtrails");
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("GET /:id", () =>{
    it("should return a single trail on success.", async () => {
        hikingData.getTrailById.mockResolvedValue({_id:"890", name:"Hiking Loop" });

        const res = await request(server).get("/hikingtrails/890");
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Hiking Loop');
        expect(res.body.error).not.toBeDefined();
    });
    it("should confirm first run was not a fluke.", async () => {
        hikingData.getTrailById.mockResolvedValue({_id: "891", name:"Another Hiking Loop" });

        const res = await request(server).get("/hikingtrails/891");
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Another Hiking Loop');
        expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 404 if trail not found.", async () => {
        hikingData.getTrailById.mockResolvedValue({_id: "892", name:"A Third Hiking Loop" });

        const res = await request(server).get("/hikingtrails/id/999");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).not.toBeDefined();
    });
  });

  describe("GET /name/:name", () =>{
    it("should return a multiple trails with term 'LOOP' on success.", async () => {
        hikingData.getTrailsByName.mockResolvedValue([{_id:"890", name:"Hiking Loop" }]);

        const res = await request(server).get("/hikingtrails/name/loop");
        expect(res.statusCode).toEqual(200);
        expect(res.body.error).not.toBeDefined();
    });
    it("should return a status code of 404 if trail not found.", async () => {
        hikingData.getTrailsByName.mockResolvedValue({_id:"890", name:"Hiking Loop"});

        const res = await request(server).get("/hikingtrails/name/poop");
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toBeDefined();
    });
  });

  describe("POST /", () =>{
    it("should return the new trail on success.", async () => {
        hikingData.create.mockResolvedValue({
            "guideId":"442c890d-7b66-44e6-b646-2c8ff3b207e1",
            "name":"Three Sisters Ridge",
            "urls": {
                "absoluteSource":"",
                "trailStart":"",
                "trailEnd":""
            },
            "measures": {
                "difficulty":"Moderate",
                "distance": {
                    "value": "8.1",
                    "measure":"miles"
                },
                "elevationGain":{
                    "value":"560",
                    "measure":"feet"}
                },
                    "updatedAt": "2016-11-27T00:45:39.485Z",
                    "locations": {
                        "latitude":"45.55",
                        "longitude":"-122.86792" },
                        "descr": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
        });

        const res = await request(server).post('/hikingtrails/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.guideId).toEqual('442c890d-7b66-44e6-b646-2c8ff3b207e1');
        expect(res.body.error).not.toBeDefined();
    });
    
    it("should return an error message if trail fails to be created.", async () => {
        hikingData.create.mockResolvedValue({ error: "Hiking Loop" });
        
        const res = await request(server).post('/hikingtrails/');
        expect(res.statusCode).toEqual(400); // Should be 404, I think, but that shows at 400 in hikingtrails.js
        expect(res.body.error).toBeDefined();
    });
  });

  describe("PUT /:id", () =>{
    it("should return the updated trail on success", async () => {
        hikingData.updateTrailById.mockResolvedValue();
        
        expect(res.statusCode).toEqual(200);
    });
    it("should return an error message if trail fails to be updated", async () => {
        
        expect(res.statusCode).toEqual(200);
    });
  });

  describe("DELETE /:id", () =>{
    it("should return a message on success", async () => {
      expect(false).toEqual(true);
    });
    it("should return a error message if trail fails to be deleted", async () => {
      expect(false).toEqual(true);
    });
  });

    describe("GET /trails/genres/:genreName", () =>{
    it("should return an array of trails on success", async () => {
      // TODO: Mock the correct data interface method
      const res = await request(server).get("/trails/genres/Short");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an empty array if no trails match genre", async () => {
      // TODO: Mock the correct data interface method
      const res = await request(server).get("/trails/genres/UEOA921DI");

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(0);
      expect(res.body.error).not.toBeDefined();
    });
    it("should return an error message on error", async () => {
      // TODO: Mock the correct data interface method

      const res = await request(server).get("/trails/genres/Short");

      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBeDefined();
    });
  });

});