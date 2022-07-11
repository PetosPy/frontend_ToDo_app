// ejshint:es6

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

let items = [];
let workTodos = [];

let today = new Date();

app.get("/", (req, res) => {
  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  let todaysDate = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listHeadings: todaysDate,
    newListItems: items,
    year: today.getFullYear(),
  });
});

app.post("/", (req, res) => {
  const newData = req.body.newItem;
  let itemType = req.body.list;

  if (newData.length != 0 && newData.trim() != "" && items.length < 5) {
    if (itemType === "Work List") {
      workTodos.push(newData);

      res.redirect("/work");
    } else {
      items.push(newData);

      res.redirect("/");
    }
  }
});

app.get("/work", function (req, res) {
  // console.log(req.body.list);
  res.render("work", {
    listHeadings: "Work List",
    newListItems: workTodos,
    year: today.getFullYear(),
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
