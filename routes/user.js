const express = require('express');
const {handleUsersignup,handleUserLogin} = require('../controllers/user');
const router = express.Router();  
router.post('/', handleUsersignup);
router.post('/login', handleUserLogin);


module.exports = router;