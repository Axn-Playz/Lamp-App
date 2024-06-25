const mongoose = require('mongoose');
const express = require('express');

const QuestionSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is must']
    },
    scoredMarks:{
        type:String,
        required:[true,'username is must']
    },

});

const QuestionCamp = new mongoose.model('QuestionCamp',QuestionSchema);

module.exports = QuestionCamp;