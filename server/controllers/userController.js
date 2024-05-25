const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// registration controller (POST)
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username, !email, !password) {
            return res.status(201).send({
                message: "inputField",
                success: false
            })
        }

        // checks for existing email
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(201).send({
                message: "exist",
                success: false
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const userData = [{
            username: username,
            email: email,
            password: hashedPass
        }]

        const dbData = await User.create(userData);
        return res.status(200).send({
            message: "notexist",
            success: true,
            user: userData
        })

    } catch (error) {
        console.log('Error at registration', error);
        return res.status(400).send({
            message: "error at registration",
            success: "false",
            error
        })
    }
};

// login user controller (POST)
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // checks for existing email
        const verifyEmail = await User.findOne({ email });
        if (verifyEmail) {
            const verifyPass = await bcrypt.compare(password, verifyEmail.password);
            if (verifyPass) {
                return res.status(200).send({
                    message: "exist",
                    success: true,
                    user:verifyEmail
                })
            }
            return res.status(201).send({
                message: "wrongPass",
                success: false
            })
        }
        console.log(verifyEmail);
        return res.status(201).send({
            message:"notexist",
            success:false
        })

    } catch (error) {
        console.log('Error at login', error);
        return res.status(400).send({
            message: "error at login",
            success: "false"
        })
    }
};

// user's info controller (GET)
exports.getAllUserController = async (req, res) => {
    try {

        const userData = await User.find({});
        if (userData){
            return res.status(200).send({
                message:"list of users",
                success:true,
                user:userData
            })
        }

        return res.status(201).send({
            message:"no users",
            success:false
        })

    } catch (error) {
        console.log('Error at fetching user info');
        return res.status(400).send({
            message: "error at fetching user info",
            success: "false"
        })
    }
};