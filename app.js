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

const shirt1 = new Shirt({
  shirtId: "01blue",
  color: "blue",
  purchasingDate: "09.03.2021",
  washingConditions: "Hand wash only"
});

const shirt2 = new Shirt({
  shirtId: "02blue",
  color: "blue",
  purchasingDate: "09.11.2020",
  washingConditions: "Wash in washing machine, set temp. to 30deg."
});

const shirt3 = new Shirt({
  shirtId: "01red",
  color: "red",
  purchasingDate: "01.12.2017",
  washingCondtions: "Wash in washing machine, set temp. to 60deg"
});

const defaultShirts = [shirt1, shirt2, shirt3];


app.get("/shirts", function(req, res) {
  Shirt.find({}, function(err, foundShirts) {
    if (foundShirts.length === 0) {
      Shirt.insertMany(defaultShirts, function(err) {
        if (!err) {
          console.log("Success")

        } else {
          console.log(err)
        }
      });
      res.redirect("/shirts")
    } else {
      res.send(foundShirts)
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
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000")
});