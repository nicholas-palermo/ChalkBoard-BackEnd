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

    app.post("/signup", async(req, res) => {
        try {
            const { studentID, fname, lname, email, password } = req.body;
            console.log(req.body);
            const newStudent = await pool.query("INSERT INTO student (studentID, fname, lname, email, pass) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
            [studentID, fname, lname, email, password]);

            res.json(newStudent.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })


    //create a faculty member

    app.post("/signup", async(req, res) => {
        try {
            const { facultyID, fname, lname, email, password } = req.body;
            console.log(req.body);
            const newFaculty = await pool.query("INSERT INTO faculty (facultyID, fname, lname, email, pass) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
            [facultyID, fname, lname, email, password]);

            res.json(newFaculty.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

    //create a course

    app.post("/", async(req, res) => {
        try {
            const { courseID, courseName, facultyID, term, subject } = req.body;
            console.log(req.body);
            const newCourse = await pool.query("INSERT INTO Course (courseID, courseName, faculty, term, subject) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
            [courseID, courseName, facultyID, term, subject]);

            res.json(newCourse.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

    //create an assignment

    app.post("/:courseID/assignments", async(req, res) => {
        try {
            const { assignmentID, courseID, title, description, dateAssigned, dateDue, maxGrade } = req.body;
            console.log(req.body);
            const newAssignment = await pool.query("INSERT INTO Assignment (assignmentID, courseID, title, description, dateAssigned, dateDue, maxGrade) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
            [assignmentID, courseID, title, description, dateAssigned, dateDue, maxGrade]);

            res.json(newAssignment.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

    //create an assignmentAttempt

    app.post("/:courseID/assignments", async(req, res) => {
        try {
            const { studentID, assignmentID, courseID, dateSubmitted, timeSubmitted, fileName, fileUpload } = req.body;
            console.log(req.body);
            const newAssignmentAttempt = await pool.query("INSERT INTO AssignmentAttempt (studentID, assignmentID, courseID, dateSubmitted, timeSubmitted, fileName, fileUpload) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
            [studentID, assignmentID, courseID, dateSubmitted, timeSubmitted, fileName, fileUpload]);

            res.json(newAssignmentAttempt.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

    //create a grade

    app.post("/:courseID/assignments/assignmentAttempt", async(req, res) => {
        try {
            const { studentID, assignmentID, grade, maxGrade, feedback, dateGraded } = req.body;
            console.log(req.body);
            const newGrade = await pool.query("INSERT INTO AssignmentAttempt (studentID, assignmentID, courseID, dateSubmitted, timeSubmitted, fileName, fileUpload) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
            [studentID, assignmentID, grade, maxGrade, feedback, dateGraded]);

            res.json(newGrade.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

//READ

    //


//UPDATE

    //


//DELETE

    //


app.listen(5000, () => {
    console.log("server is starting on port 5000");
})