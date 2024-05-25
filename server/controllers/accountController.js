const express = require('express');
const Account = require('../models/accountModel');

exports.accountController = async(req,res) =>{
    try {

        const {appName,age,hobbies,qualification} = req.body;
        if (!appName, !age, !hobbies, !qualification){
            return res.status(201).send({
                message:"inputField",
                success:false
            })
        }

        const data = [{
            appName:appName,
            age:age,
            hobbies:hobbies,
            qualification:qualification
        }];
        
        const accountDb = await Account.create(data);
        return res.status(200).send({
            message:"account",
            success:true,
            data:accountDb
        })
        
    } catch (error) {
        console.log('error at posting data',error);
        return res.status(400).send({
            message:'Error at a/c',
            success:false
        })
    }
}

exports.getAllUserDataController = async(req,res) =>{
    try {

        const allData = await Account.find({});
        return res.status(200).send({
            message:"data fetched",
            success:true,
            data:allData
        })
        
    } catch (error) {
        console.log('error at fetching data',error);
        return res.status(400).send({
            message:'Error at data',
            success:false
        })
    }
}