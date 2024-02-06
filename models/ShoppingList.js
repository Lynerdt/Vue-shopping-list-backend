const mongoose = require("mongoose");
const dayjs = require("dayjs");
dayjs().format();

const shoppingListSchema = new mongoose.Schema({
  title: { type: String, max: 50, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("ShoppingList", shoppingListSchema);
