CREATE DATABASE chalkboard;

CREATE TABLE Student(
    studentID SERIAL,
    userType char(8) NOT NULL,
    fName varchar (20) NOT NULL,
    lName varchar (20) NOT NULL,
    email varchar (100) NOT NULL,
    pass varchar (255) NOT NULL,
    PRIMARY KEY (studentID)
);

CREATE TABLE Faculty(
    facultyID SERIAL,
    userType char(8) NOT NULL,
    fName varchar (20) NOT NULL,
    lName varchar (20) NOT NULL,
    email varchar (100) NOT NULL,
    pass varchar (255) NOT NULL,
    PRIMARY KEY (facultyID)
);

CREATE TABLE Course(
    courseID char (6),
    courseName varchar (255) NOT NULL,
    facultyID int,
    term varchar (10),
    courseSubject varchar (30) NOT NULL,
    FOREIGN KEY (facultyID)  REFERENCES Faculty(facultyID),
    PRIMARY KEY(courseID, term)
);

CREATE TABLE StudentCourse(
    studentID int REFERENCES Student(studentID),
    courseID char(6),
    term varchar(10),
    FOREIGN KEY (courseID, term) REFERENCES Course(courseID, term),
    PRIMARY KEY(studentID, courseID, term)
);

 CREATE TABLE Assignment(
	assignmentID SERIAL,
    courseID char(6), 
    term varchar (10),
    title varchar(255) NOT NULL,
    description text,
    maxGrade float,
    dateAssigned date,
    dateDue date,
    FOREIGN KEY (courseID, term) REFERENCES Course(courseID, term), 
    PRIMARY KEY(assignmentID, courseID)
);

CREATE TABLE AssignmentAttempt (
    studentID int REFERENCES Student(studentID),
    assignmentID int,
    courseID char(6),
    dateSubmitted date,
    timeSubmitted time,
    fileName text, 
    fileUpload oid,
    FOREIGN KEY (assignmentID, courseID) REFERENCES Assignment(assignmentID, courseID),
    PRIMARY KEY(studentID, assignmentID)
);

CREATE TABLE Grade (
    studentID int REFERENCES Student(studentID),
    assignmentID int,
    grade float,
    maxGrade float NOT NULL,
    feedback text,
    dateGraded date,
    FOREIGN KEY (studentID, assignmentID) REFERENCES AssignmentAttempt(studentID, assignmentID),
    PRIMARY KEY(studentID, assignmentID)
);

