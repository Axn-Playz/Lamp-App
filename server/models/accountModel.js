const mongoose = require("mongoose");
const { type } = require("os");

const userSurveySchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,'Username is required'],
    },
    educationLevel: {
        type: String,
        required: [true, 'Current education level is required'],

    },
    interests: {
        type: [String],
        required: [true, 'At least one interest is required'],

    },
    skills: {
        type: [String],
        required: [true, 'At least one skill is required'],

    },
    careerGoals: {
        type: String,
        required: [true, 'Career goals are required']
    },
    industriesOfInterest: {
        type: [String],
        required: [true, 'At least one industry of interest is required'],

    },
    workExperience: {
        type: String,
        required: [true, 'Work experience information is required'],

    },
    majorFieldOfStudy: {
        type: String,
        required: [true, 'Major or field of study is required']
    },
    willingToRelocate: {
        type: String,
        required: [true, 'Relocation willingness is required'],
    },
    financialConstraints: {
        type: String,
        required: [true, 'Financial constraints information is required'],
    },
    additionalInfo: {
        type: String,
        required: [false]
    },
    selectedCourse:{
        type:Object
    }
}, { timestamps: true });

const Account = mongoose.model('Account', userSurveySchema);

module.exports = Account;
