// ejshint:es6

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

var items = [];

app.get("/", (req, res) => {
  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  let today = new Date();
  let todaysDate = today.toLocaleDateString("en-US", options);

  res.render("list", {
    todaysDate: todaysDate,
    newListItems: items,
    year: today.getFullYear(),
  });
});

app.post("/", (req, res) => {
  const newData = req.body.newItem;
  if (newData.length != 0 && newData.trim() != "" && items.length < 5) {
    items.push(newData);
    console.log(newData);
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
