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
  shirtId: String,
  color: String,
  purchasingDate: String,
  washingConditions: String,
}

const Shirt = mongoose.model("Shirt", shirtSchema);

app.get("/shirts", function(req, res) {
  Shirt.find(function(err, foundShirts) {
    if (!err) {
      res.send(foundShirts)
    } else {
      res.send(err);
    }
  });
});

app.post("/shirts", function(req, res) {

  const newShirt = new Shirt({
    shirtId: req.body.shirtId,
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

app.delete("/shirts/:shirtId", function(req, res) {
  Shirt.deleteOne({
    shirtId: req.params.shirtId
  }, function(err) {
    if (!err) {
      res.send("Successfully deleted shirt");
    } else {
      res.send(err)
    }
  });
});

app.get("/shirts/:color", function(req, res) {
  Shirt.countDocuments({
    color: req.params.color
  }, function(err, count) {
    if (!err) {
      const foundNumber = count
      res.send("There are " + foundNumber + " shirts with this color")
    } else {
      res.send(err)
    }
  })
});



app.listen(3000, function() {
  console.log("Server started on port 3000")
});