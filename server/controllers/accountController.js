const express = require('express');
const Account = require('../models/accountModel');

exports.accountController = async (req, res) => {
    try {


        const { username,
            educationLevel,
            interests,
            skills,
            careerGoals,
            industriesOfInterest,
            workExperience,
            majorFieldOfStudy,
            willingToRelocate,
            financialConstraints,
            additionalInfo,
        } = req.body;


        // if (!username||
        //     !educationLevel ||
        //     !interests ||
        //     !skills ||
        //     !careerGoals ||
        //     !industriesOfInterest ||
        //     !workExperience ||
        //     !majorFieldOfStudy ||
        //     !willingToRelocate ||
        //     !financialConstraints ||
        //     !additionalInfo) {
        //     return res.status(201).send({
        //         message: "inputFielddd",
        //         success: false,
        //     })
        // }

        // console.log(selectedCourse)

        const data = [{
            username,
            educationLevel,
            interests,
            skills,
            careerGoals,
            industriesOfInterest,
            workExperience,
            majorFieldOfStudy,
            willingToRelocate,
            financialConstraints,
            additionalInfo,
        }];

        const accountDb = await Account.create(data);
        return res.status(200).send({
            message: "account",
            success: true,
            data: accountDb
        })

    } catch (error) {
        console.log('error at posting data', error);
        return res.status(400).send({
            message: 'Error at a/c',
            success: false
        })
    }
}



exports.getAllUserDataController = async (req, res) => {
    try {

        const allData = await Account.find({});
        return res.status(200).send({
            message: "data fetched",
            success: true,
            data: allData
        })

    } catch (error) {
        console.log('error at fetching data', error);
        return res.status(400).send({
            message: 'Error at data',
            success: false
        })
    }
}

exports.getUserById = async (req, res) => {
    try {

        const { username } = req.params;
        const data = await Account.findOne({ username });
        if (data) {
            return res.status(200).send({
                message: "fetched",
                success: true,
                data
            })
        }
        return res.status(201).send({
            message: 'notFound',
            success: false
        })

    } catch (error) {
        return res.status(400).send({
            message: "Error at id",
            success: false
        })
    }
}


exports.updateSelectedCourse = async (req, res) => {
    try {
        const { username, selectedCourse } = req.body;

        if (!username || !selectedCourse) {
            return res.status(400).send({
                message: "Username and selectedCourse are required",
                success: false,
            });
        }

        const account = await Account.findOneAndUpdate(
            { username },
            { $set: { selectedCourse } },
            { new: true }
        );

        if (!account) {
            return res.status(404).send({
                message: "Account not found",
                success: false
            });
        }

        return res.status(200).send({
            message: "Selected course updated successfully",
            success: true,
            data: account
        });

    } catch (error) {
        console.log('Error updating selected course', error);
        return res.status(400).send({
            message: 'Error updating selected course',
            success: false
        });
    }
}


