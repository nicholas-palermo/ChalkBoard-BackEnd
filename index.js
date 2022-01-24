const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json()); // => allows us to access to the req.body

//ROUTES


//CREATE
    //create a student


    //create a faculty member


    //create a course


    //create an assignment


    //create an assignmentAttempt


    //create a grade

//READ



//UPDATE




//DELETE



app.listen(5000, () => {
    console.log("server is starting on port 5000");
})