const express = require("express");
const controllers = require("../controllers/users");


const router = express.Router();


// @route POST api/users/register
// @desc Register new user
// @access Public
router.post("/register", controllers.register);

// @route POST api/users/login
// @desc Login user and create a JWT token
// @access Public
router.post("/login", controllers.login)
