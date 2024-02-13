const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const dayjs = require("dayjs");

// connect mongodb
const port = process.env.PORT;

//mongooose
const mongoose = require("mongoose");
const ShoppingList = require("./models/ShoppingList");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.once("open", () => console.log("connected to mongoDB"));

//setup app
const app = express();
app.use(morgan("dev"));
app.use(express.json());

//Get all lists
app.get("/shoppinglists", (req, res) => {
  ShoppingList.find()
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(400).json({ message: "Try again" }));
});
// get specific list
app.get("/shoppinglists/:shoppinglistId", (req, res) => {
  ShoppingList.findById(req.params.shoppinglistId)
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: "error" });
      }
    })
    .catch((error) => res.status(400).json({ message: "Bad request" }));
});

//Post a list
app.post("/shoppinglists", (req, res) => {
  const newShoppingList = new ShoppingList(req.body);
  newShoppingList.save();
  res.status(201).json(newShoppingList);
});
//patch a list
app.patch("/shoppinglists/:shoppinglistId", (req, res) => {
  ShoppingList.findById(req.params.shoppinglistId)
    .then((ShoppingList) => {
      if (shoppinglist) {
        shoppinglist.title = req.body.title || shoppinglist.title;
        shoppinglist.updatedAt = req.body.updatedAt;
        shoppinglist.save();
        res.status(200).json(shoppinglist);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(404).json({ message: "bad request" }));
});
//delete a list
app.delete("/shoppinglists/:shoppinglistId", (req, res) => {
  ShoppingList.findById(req.params.shoppinglistId)
    .then((shoppinglist) => {
      if (shoppingList) {
        shoppingList.deleteOne();
        res.status(200).json(shoppinglist);
      } else {
        res.status(404).json({ message: "list not found" });
      }
    })
    .catch((error) => res.status(404).json({ message: "try again" }));
});

//edit items
app.post("/shoppinglists/:shoppinglistID/items", (req, res) => {
  ShoppingList.findById(req.params.shoppinglistId)
    .then((shoppinglist) => {
      if (shoppinglist) {
        shoppinglist.items.push(req.body.items);
        shoppinglist.save();
        res.status(201).json(shoppinglist);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(404).json({ message: "bad request" }));
});

//delete specific item
app.delete("/shoppinglists/:shoppinglistId/items/:itemId", (req, res) => {
  ShoppingList.findById(req.params.shoppinglistId)
    .then((shoppinglist) => {
      if (shoppinglist) {
        shoppinglist.items.id(req.params.itemId).deleteOne();
        shoppinglist.save();
        res.status(200).json(shoppinglist);
      } else {
        res.status(400).json({ message: "item not found" });
      }
    })
    .catch((error) => res.status(404).json({ message: "try again" }));
});

app.get("*", function (req, res) {
  res.status(404).json({ message: "try again" });
});

app.listen(port, () => console.log("App is running on port ${port}"));
