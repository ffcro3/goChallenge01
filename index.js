const express = require("express");
const routes = require("./src/routes");

const server = express();

server.use(express.json());
server.use(routes);

server.listen(4000, () => {
  return console.log("Application started at port 4000 ...");
});
