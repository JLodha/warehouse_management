const managerRoute = require('express').Router();
const  manager_verify = require('../controllers/verifyToken');
const  {managerRegister,managerLogin,managerCreateItem} = require('../controllers/managerController');
const Manager = require("../model/Manager");
const { func } = require('joi');

managerRoute.get('/register', (req, res) => {
    res.render("signup");
})
managerRoute.get('/login',function (req, res) {
    res.render("signup");
})
managerRoute.post('/register',managerRegister);

managerRoute.post('/login',managerLogin);

managerRoute.get('/createItem', function(req,res){
    res.render("createItem");
});

managerRoute.post('/createItem', managerCreateItem);

module.exports = managerRoute;