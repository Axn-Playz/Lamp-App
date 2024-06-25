const express = require("express");
const { accountController, getAllUserDataController, getUserById, updateSelectedCourse } = require("../controllers/accountController");
const { userQuestionCampController, getUserScore } = require("../controllers/questionCampController");

const router = express.Router();

// POST for storing user's data

router.post('/data',accountController);


// UPDATE aacount Setup

router.post('/load',updateSelectedCourse);

// GET for all user's data

router.get('/all-data',getAllUserDataController);

// GET for user by username

router.post('/:username',getUserById);

// POST the user's activity

router.post('/',userQuestionCampController)

// GET user score

router.post('/user/:username',getUserScore);



module.exports = router