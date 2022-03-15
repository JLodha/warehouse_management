const mongoose = require("mongoose");

const itemSchema= mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    // name: String,
    volume: Number,
    category: String,
    price: Number,
    quantity: Number
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;