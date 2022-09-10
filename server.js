const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const server = express();
server.use(express.json());

server.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
}

server.use(routes);

module.exports = serve

