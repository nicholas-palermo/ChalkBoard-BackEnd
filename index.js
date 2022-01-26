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
            const { userType, fname, lname, email, pass } = req.body;
            console.log(req.body);
            const newStudent = await pool.query("INSERT INTO student (userType, fname, lname, email, pass) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
            [userType, fname, lname, email, pass]);

            res.json(newStudent.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })


    //create a faculty member

    app.post("/signup/faculty", async(req, res) => {
        try {
            const { userType, fname, lname, email, pass } = req.body;
            console.log(req.body);
            const newFaculty = await pool.query("INSERT INTO faculty (userType, fname, lname, email, pass) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
            [userType, fname, lname, email, pass]);

            res.json(newFaculty.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

    //create a course

    app.post("/newCourse", async(req, res) => {
        try {
            const { courseID, courseName, facultyID, term, courseSubject } = req.body;
            console.log(req.body);
            const newCourse = await pool.query("INSERT INTO Course (courseID, courseName, facultyID, term, courseSubject) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
            [courseID, courseName, facultyID, term, courseSubject]);

            res.json(newCourse.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

    //create an assignment

    app.post("/:courseID/newAssignment", async(req, res) => {
        try {
            const { courseID, term, title, description, maxGrade, dateAssigned, dateDue } = req.body;
            console.log(req.body);
            const newAssignment = await pool.query("INSERT INTO Assignment (courseID, term, title, description, maxGrade, dateAssigned, dateDue) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
            [courseID, term, title, description, maxGrade, dateAssigned, dateDue]);

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

    //get a student during login
    app.get("/login/:email"), async(req,res) => {
        try {
            const { email } = req.params;
            const student = await pool.query ("SELECT * FROM Student WHERE email = $1", [email])

            res.json(student.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    }


    //get a faculty member
    app.get("/:facultyID/"), async(req,res) => {
        try {
            const {facultyID} = req.params;
            const faculty = await pool.query ("SELECT * FROM Faculty WHERE facultyID = $1", [facultyID])

            res.json(faculty.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    }

    //get a student's courses
    app.get("/:studentID/"), async(req, res) => {
        try {
            const { studentID } = req.params;
            const studentCourses = await pool.query("SELECT * FROM StudentCourse WHERE studentID = $1", [studentID]);

            res.json(studentCourses.rows);
        } catch (err) {
            console.error(err.message);
        }
    }

/*
    //get a course
    app.get(), async(req, res) => {
        try {
           
        } catch (err) {
            console.error(err.message);
        }
    }

*/
    //get a courses assignment's
     app.get("/Assignments/:courseID", async(req, res) => {
        try {
            const {courseID} = req.params;
            const courseAssgignments = await pool.query("SELECT * FROM Assignment WHERE courseID = $1", [courseID]);

            res.json(courseAssgignments.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    
    //get an assignment
   


    //get a student's grades
    app.get("/Grades"), async(req, res) => {
        try {
           
        } catch (err) {
            console.error(err.message);
        }
    }



//UPDATE

    //


//DELETE

    //


app.listen(5000, () => {
    console.log("server is starting on port 5000");
})