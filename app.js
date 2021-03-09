const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/shirtDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(3000, function() {
  console.log("Server started on port 3000")
});