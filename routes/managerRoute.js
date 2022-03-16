const managerRoute = require('express').Router();
const manager_verify = require('../controllers/managerVerifyToken');
const {
    managerRegister,
    managerLogin,
    managerCreateItem,
    managerAddItem,
    managerUpdateItem,
    managerViewItem
} = require('../controllers/managerController');
const Manager = require("../model/Manager");
const {
    func
} = require('joi');

managerRoute.get('/register', (req, res) => {
    if (req.session.isManager) {
        return res.render("manager");
    }
    res.render("signup");
})
managerRoute.get('/login', function (req, res) {
    if (req.session.isManager) {
        return res.render("manager");
    }
    res.render("signup");
})
managerRoute.post('/register', managerRegister);


managerRoute.post('/login', managerLogin);

managerRoute.get('/createItem', function (req, res) {
    res.render("createItem");
});

managerRoute.post('/createItem', managerCreateItem);

managerRoute.post('/addItem', managerAddItem);

managerRoute.get('/viewItems', managerViewItem);

// console.log(managerCreateItem);
// console.log(managerUpdateItem);
managerRoute.post('/updateItem', managerUpdateItem);

module.exports = managerRoute;