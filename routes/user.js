const express = require('express');
const { handleUsersignup, handleUserLogin, handleUserLogout } = require('../controllers/user');
const router = express.Router();
router.post('/', handleUsersignup);
router.post('/login', handleUserLogin);
router.get('/logout', handleUserLogout);


module.exports = router;