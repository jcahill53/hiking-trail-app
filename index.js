const server = require("./server");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5001;
}
server.listen(port, () =>
console.log(`Server is listening on http://localhost:${port}`));