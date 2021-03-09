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


const shirtSchema = {
  color: String,
  purchasingDate: String,
  washingConditions: String,
}

const Shirt = mongoose.model("Shirt", shirtSchema);

app.get("/", function(req, res) {
  Shirt.find(function(err, foundShirts) {
    if (!err) {
      res.send(foundShirts)
    } else {
      res.send(err);
    }
  });
});

app.post("/", function(req, res) {

  const newShirt = new Shirt({
    color: req.body.color,
    purchasingDate: req.body.purchase,
    washingConditions: req.body.wash
  });
  newShirt.save(function(err) {
    if (!err) {
      res.send("You added new shirt to your collection!")
    } else {
      res.send(err);
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000")
});