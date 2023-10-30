const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

server.on("error", error => {
  console.error(`An error occurred while starting the server: ${error}`);
});

server.on("close", () => {
  console.log("Server has been closed");
});
