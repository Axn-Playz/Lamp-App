const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// dotenv congig

const config = dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
.then(()=>console.log('connection successfully established...'.bgGreen))
.catch((e)=>console.log('Error at connection...'));