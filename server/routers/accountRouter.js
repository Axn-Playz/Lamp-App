const express = require("express");
const { accountController, getAllUserDataController } = require("../controllers/accountController");

const router = express.Router();

// POST for storing user's data

router.post('/data',accountController);

// GET for all user's data

router.get('/all-data',getAllUserDataController);

module.exports = router