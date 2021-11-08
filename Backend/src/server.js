const express = require("express");
const app = express();
const connect = require("./config/db");
app.use(express.json());

app.listen(2345, async () => {
  connect();
  console.log("server running");
});
