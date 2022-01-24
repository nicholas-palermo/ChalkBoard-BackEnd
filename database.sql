CREATE DATABASE chalkboard;

CREATE TABLE Student(
    studentID varchar (10) PRIMARY KEY,
    fName varchar (20) NOT NULL,
    lName varchar (20) NOT NULL,
    email varchar (100) NOT NULL,
    pass varchar (255) NOT NULL
);

CREATE TABLE Faculty(
    facultyID varchar (10) PRIMARY KEY,
    fName varchar (20) NOT NULL,
    lName varchar (20) NOT NULL,
    email varchar (100) NOT NULL,
    pass varchar (255) NOT NULL
);

CREATE TABLE Course(
    courseID char (6),
    courseName varchar (255) NOT NULL,
    facultyID varchar (10) REFERENCES Faculty(facultyID),
    term varchar (10),
    subject varchar (30) NOT NULL,
    PRIMARY KEY(courseID, term)
);

CREATE TABLE StudentCourse(
    studentID varchar(10) REFERENCES Student(studentID),
    courseID char(6),
    term varchar(10),
    FOREIGN KEY (courseID, term) REFERENCES Course(courseID, term),
    PRIMARY KEY(studentID, courseID, term)
);

CREATE TABLE Assignment(
    assignmentID varchar(10),
    courseID char(6) REFERENCES Course(courseID),
    title varchar(255) NOT NULL,
    description text,
    maxGrade float,
    dateAssigned date,
    dateDue date,
    PRIMARY KEY(assignmentID, courseID)
);

CREATE TABLE AssignmentAttempt (
    studentID varchar(10) REFERENCES Student(studentID),
    assignmentID varchar (10),
    courseID char(6),
    dateSubmitted date,
    timeSubmitted time,
    fileName text, 
    fileUpload oid,
    FOREIGN KEY (assignmentID, courseID) REFERENCES Assignment(assignmentID, courseID),
    PRIMARY KEY(studentID, assignmentID)
);

CREATE TABLE Grade (
    studentID varchar (10) REFERENCES Student(studentID),
    assignmentID varchar (10),
    grade float,
    maxGrade float NOT NULL,
    feedback text,
    dateGraded date,
    FOREIGN KEY (studentID, assignmentID) REFERENCES AssignmentAttempt(studentID, assignmentID),
    PRIMARY KEY(studentID, assignmentID)
);

