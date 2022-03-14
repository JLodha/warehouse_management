const managerRoute = require('express').Router();
const  manager_verify = require('../controllers/verifyToken');
const  managerRegister = require('../controllers/managerController');
const Manager = require("../model/Manager");

managerRoute.get('/register',function (req, res) {
    res.render("signup");
})
managerRoute.post('/register',managerRegister);

module.exports = managerRoute;