// required modules

const express = require('express');
const dotenv = require("dotenv");
const morgon = require("morgan")
const colors = require("colors");
const config = require("./config/conn");
const userRouter = require("./routers/userRouter");
const accountRouter = require("./routers/accountRouter");
const cors = require("cors");


// rest objects 
const app = express();
const dotConfig = dotenv.config();
const PORT = process.env.PORT || 5000;

// middlewars
app.use(cors());
app.use(express.json());
app.use(morgon('dev'));

// routing 

app.get("/",(req,res)=>{
    res.send("Hey buddy!!");
})

app.use("/user",userRouter);
app.use('/account',accountRouter);

// Listening 

app.listen(PORT,()=>{
    console.log(`Listening to port no.${PORT}`.bgCyan);
})
