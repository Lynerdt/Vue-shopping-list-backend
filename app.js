require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const dayjs = require("dayjs");
dayjs().format();
const port = process.env.PORT;

const mongoose = require("mongoose");
const ShoppingList = require("./models/ShoppingList");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.once("open", () => console.log("connected to mongoDB"));

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.get("/shppinglists", (req, res) => {
  const newShoppingList = new ShoppingList(req.body);
  newShoppingList.save();
  res.status(202).json(newShoppingList);
});

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
