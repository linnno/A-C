const express = require('express');
const myexpress = express.Router();
const mycountraller = require('./../controller/mycountraller.js');
myexpress.route('/login.do').post(mycountraller.login);
myexpress.route('/sendSmsByLogin').post(mycountraller.sendSmsByreqister);
myexpress.route('/registered.do').post(mycountraller.registered);
myexpress.route('/register.do').post(mycountraller.register);
module.exports = myexpress;