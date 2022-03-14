const router = require("express").Router();
const jwt = require("jsonwebtoken");

const adminLogin = function (req, res) {
    const username=req.body.email;
    const password=req.body.password;
    console.log(username);
    console.log(password);
    if(username=="authority.iiita@gmail.com"&&password=="1234")
    {
        const admintoken = jwt.sign({
            _id: password
          },
          process.env.TOKEN_SECRET
        );
        console.log("a");
        res.header('admin-auth-token', admintoken).json(admintoken);
    }
    else
    {
        res.status(400).json("Invalid Credentials!");
    }
};

module.exports = {adminLogin};