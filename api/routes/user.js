const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UserControllers = require('../controllers/users');

const User = require('../models/user');

// SIGN UP

router.post('/signup', UserControllers.user_signup);

// LOGIN

router.post('/login', UserControllers.user_login);

// DELETE USER

router.delete('/delete/:userId', checkAuth, UserControllers.user_delete);

// GET ALL USERS

router.get('/', checkAuth, UserControllers.user_get_all);

module.exports = router;
