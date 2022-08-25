const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const server = express();
server.use(express.json());

server.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
}

// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
server.get('/getData', cors(corsOptions), async (req, res) => {
    const fetchOptions = {
        method: 'GET'
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json();
    res.json(jsonResponse);
});

server.use(routes);

module.exports = server;

