const mongoose = require("mongoose");

const managerSchema= mongoose.Schema({
    email: String,
    password: String,
    manager_type: String
});


const Manager = mongoose.model("Manager", managerSchema);
module.exports = Manager;