const express = require('express');
const QuestionCamp = require('../models/userQuestionCamp');

exports.userQuestionCampController = async (req, res) => {
    try {
        const { username, scoredMarks } = req.body;

        if (!username || !scoredMarks ) {
            return res.status(400).send({
                message: "Username or score is missing",
                success: false
            });
        }


        const updateScore = await QuestionCamp.findOneAndUpdate(
            { username },
            { $set: { scoredMarks } },
            { new: true, upsert: true }
        );


        if (updateScore) {
            return res.status(200).send({
                message: "Score updated successfully",
                success: true
            });
        }

        return res.status(500).send({
            message: "Failed to update or create score entry",
            success: false
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error at questionCamp controller",
            success: false
        });
    }
}


exports.getUserScore = async(req,res)=>{
    try {

        const {username} = req.params;
        const findScore = await QuestionCamp.findOne({username});
        if (findScore){
            return res.status(200).send({
                message:"fetched",
                success:true,
                data:findScore
            })
        }

        return res.status(201).send({
            message:"no usernmae",
            success:false
        })
        
    } catch (error) {
        console.log('Error getting user score ', error);
        return res.status(400).send({
            message: 'Error updating selected course',
            success: false
        });
    }
    
}