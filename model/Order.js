const mongoose = require("mongoose");

let Item = {
    name: String,
    quantity: Number
}

const OrderSchema= mongoose.Schema({
    itemList: [Item],
    customerDetails: {
        name: String,
        address: String,
        contact: String
    }
});


const Order = mongoose.model("Manager", OrderSchema);
module.exports = Order;