const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema({
  title: { type: String, max: 50, required: true },
  createdAt: { type: Date, timestamp: true },
  updatedAt: { type: Date, timestamp: true },
  items: [
    {
      name: String,
      quantity: Number,
      purchased: Boolean,
    },
  ],
});

module.exports = mongoose.model("ShoppingList", shoppingListSchema);
