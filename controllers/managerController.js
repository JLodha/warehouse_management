const router = require("express").Router();
const Manager = require("../model/Manager");
const Item = require("../model/Item");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
    managerRegisterValid,
    managerLoginValid
} = require("./validation");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Connected to MongoDB")
);



const managerRegister = async (req, res) => {
    const manager = new Manager(req.body);
    console.log(req.body);
    let givenEmail = req.body.email;
    let givenPassword = req.body.password;

    // validation
    const {
        error
    } = await managerRegisterValid(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // check whether user already in database or not
    const emailExist = await Manager.findOne({
        email: givenEmail
    });
    // const contactExist = await manager.findOne{( contact: req.body.contact)};
    if (emailExist) return res.status(400).json('Email already exists');

    // hash password
    const salt = await bcrypt.genSalt(10);
    manager.password = await bcrypt.hash(givenPassword, salt);
    manager.save();
    console.log("success");
    req.session.isManager = true;
    req.session.email = givenEmail;
    return res.render("manager");
};
const managerLogin = async (req, res) => {
    console.log(req.session.isManager);
    if (req.session.isManager) {
        return res.render("manager");
    }
    console.log("HELLO");
    const inputemail = req.body.email2;
    const password = req.body.password2;
    const {
        error
    } = await managerLoginValid(req.body);
    console.log(error);
    if (error) return res.status(400).json(error.details[0].message);

    console.log(inputemail);
    console.log(password);
    const manager = await Manager.findOne({
        email: inputemail
    });
    console.log(manager);
    bcrypt.compare(password, manager.password, async function (err, req1, res1) {
        if (!err) {
            const managerToken = jwt.sign({
                    _id: password // manager._id
                },
                process.env.TOKEN_SECRET
            );
            // res.header('auth-token', managerToken).json(managerToken);
            // res.render("manager");
            console.log("HELLO");
            console.log(jwt.verify(managerToken, process.env.TOKEN_SECRET));
            req.session.isManager = true;
            req.session.email = inputemail;
            console.log(req.session);
            // res.render("manager",{token:managerToken});
            return res.render("manager");
        } else {
            console.log("Not done");
            res.status(400).json("Invalid Credentials!");
        }
    });
};
const managerCreateItem = async (req, res) => {
    //body will contain all the details of the item --> name, price, volume, category in the form of req.body
    const name = req.body.name;
    const price = req.body.price;
    const volume = req.body.volume;
    const category = req.body.category;
    console.log(req);
    const itemExist = await Item.findOne({
        name: name
    });
    if (itemExist) return res.status(400).json('Item already exists');
    const item = new Item({
        name: name,
        price: price,
        volume: volume,
        category: category,
        quantity: 0
    });
    item.save();
    console.log(item);
    console.log("Item created");
};

const managerAddItem = async (req, res) => {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const itemExist = await Item.findOne({
        name: name
    });
    console.log(itemExist);
    var val = itemExist.quantity;
    console.log(val);
    val = val + quantity;
    console.log(quantity);
    console.log(val);
    if (!itemExist) return res.status(400).json('Item doesnot exist');
    Item.updateOne({
        name: name
    }, {
        quantity: val
    }, function (err1, res1) {
        // console.log(this);
        if (err1) throw err1;
        console.log(" document(s) updated");
    });
}

const managerUpdateItem = async (req, res) => {
    // pass object in the frontend and write the intial values in the placeholder
    const name = req.body.name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const volume = req.body.volume;
    const category = req.body.category;
    const itemExist = await Item.findOne({
        name: name
    });
    if (!itemExist) return res.status(400).json('Item doesnot exist'); //[{1:2}, {3:4}]
    // for(var i = 0; i < arr.length; i++){
    //     const field = arr[0]
    // }
    Item.updateOne({
        name: name
    }, {
        price: price,
        volume: volume,
        category: category,
        quantity: quantity
    }, function (err1, res1) {
        // console.log(this);
        if (err1) throw err1;
        console.log(" document(s) updated");
    });
}

const managerViewItem = async (req, res) => {
    Item.find({}, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(result);
        //render the result to the ejs
    });
}

// console.log(managerUpdateItem);

module.exports = {
    managerRegister,
    managerLogin,
    managerCreateItem,
    managerAddItem,
    managerUpdateItem,
    managerViewItem
};