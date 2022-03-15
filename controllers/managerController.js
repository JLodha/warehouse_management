const router = require("express").Router();
const Manager = require("../model/Manager");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { managerRegisterValid, managerLoginValid } = require("./validation");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to MongoDB")
); 



const managerRegister = async (req, res) => {
    const  manager = new Manager(req.body);
    console.log(req.body);
    let givenEmail = req.body.email;
    let givenPassword = req.body.password;
    
    // validation
    const {error} = await managerRegisterValid(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    // check whether user already in database or not
    const emailExist = await Manager.findOne({ email: givenEmail});
    // const contactExist = await manager.findOne{( contact: req.body.contact)};
    if(emailExist) return res.status(400).json('Email already exists');

    // hash password
    const salt = await bcrypt.genSalt(10);
    manager.password =await bcrypt.hash(givenPassword, salt);
    manager.save();
    console.log("success");
    // try {
    //     var created_date_time = manager.creation_date;
    //     var current_date_time = manager.last_login_date;

    //     current_date_time = currDateTime(currentTime);
    //     if(!created_date_time) {
    //         created_date_time = currDateTime(currentTime);
    //     }
        
    //     const log = new Log({
    //         createdAt: current_date_time,
    //         action: "Successfully Registered "+ manager.username,
    //         role: "Manager" 
    //     });

    //     log.save(function(err){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             // console.log("Updated Logs");
    //         }
    //     });
    // } catch(err) {
    //     res.status(400).json(err);
    // }
};
const managerLogin =async (req, res)=> {
    const inputemail=req.body.email2;
    const password=req.body.password2;
    console.log(inputemail);
    console.log(password);
    const manager = await Manager.findOne({email:inputemail});
    console.log(manager);
    bcrypt.compare(password, manager.password,async function(err,req1,res1){
    if(!err)
    {
     
        const managerToken = jwt.sign({
            _id: password
          },
          process.env.TOKEN_SECRET
        );
        // res.header('auth-token', managerToken).json(managerToken);
        // res.render("manager");
          res.render("manager",{token:managerToken});
    }
    else
    {
        console.log("Not done");
        res.status(400).json("Invalid Credentials!");
    }});
};
//  function myfunction()
//     {
//         promise = longfunctionfirst().then(shortfunctionsecond);
//     }
//     function longfunctionfirst()
//     {
//         d = new $.Deferred();
//         setTimeout('alert("first function finished");d.resolve()',3000);
//         return d.promise()
//     }
//     function shortfunctionsecond()
//     {
//         d = new $.Deferred();
//         setTimeout('alert("second function finished");d.resolve()',200);
//         return d.promise()
//     }
module.exports = {managerRegister, managerLogin} ;