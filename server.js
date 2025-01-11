const http = require("http");

const app = require("./app");

const port = process.env.PORT || 4048;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

console.log("Uruchamiam serwer...");
console.log("Lokalizacja app.js:", require.resolve("./app"));