const mongoose = require("mongoose");
const dayjs = require("dayjs");

const shoppingListSchema = new mongoose.Schema(
  {
    title: { type: String, max: 50, required: true },
    items: [
      {
        name: String,
        quantity: Number,
        purchased: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShoppingList", shoppingListSchema);
