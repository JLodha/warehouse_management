const adminRoute = require('express').Router();
const  admin_verify = require('../controllers/verifyToken');
const  {adminLogin} = require('../controllers/adminController');

adminRoute.post('/login',adminLogin);

module.exports = adminRoute;