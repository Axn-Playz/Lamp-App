const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// registration controller (POST)
exports.registerController = async (req, res) => {
    try {
        const { username, email, password , avatarCode } = req.body;

        if (!username, !email, !password, !avatarCode) {
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
            password: hashedPass,
            avatarCode
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



exports.changerUsernameController = async (req, res) => {
    try {
        const { username } = req.params;
        const { newUsername } = req.body;

        // Check if username and newUsername are provided
        if (!username || !newUsername) {
            return res.status(400).send({
                message: "username and newUsername are required",
                success: false
            });
        }

        // Find the user by current username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false
            });
        }

        // Update the username
        user.username = newUsername;
        await user.save();

        return res.status(200).send({
            message: "Username updated successfully",
            success: true,
            user: user
        });

    } catch (error) {
        console.error('Error changing username:', error);
        return res.status(500).send({
            message: "Error changing username",
            success: false,
            error: error.message
        });
    }
};
