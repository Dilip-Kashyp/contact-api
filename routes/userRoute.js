const express = require('express');

const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const vaildateToken = require('../middleware/tokenHandler');

const route = express.Router();

route.get("/current", vaildateToken, currentUser);
route.post("/register", registerUser);
route.post("/login", loginUser);

module.exports = route
