const express = require("express");
const { registerController, getAllUserController, loginController } = require("../controllers/userController");


// router object 
const router = express.Router();

// POST method for registration
router.post("/register",registerController);

// GET method for all user's info
router.get("/all-users",getAllUserController);

// POST method for login
router.post("/login",loginController);

module.exports = router;