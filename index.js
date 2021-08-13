const fs = require("fs");
const inquirer = require("inquirer");

const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

// Create an array of questions for user input
const questions = [
    {
        type: "input",
        message: "Enter team manager's name:",
        name: "managerName",
    },
    {
        type: "input",
        message: "Enter team manager's employee ID:",
        name: "managerId",
    },
    {
        type: "input",
        message: "Enter team manager's email address:",
        name: "managerEmail",
    },
    {
        type: "input",
        message: "Enter team manager's office number:",
        name: "managerOfficeNumber",
    },
];

// Initialize inquirer, write HTML with inquirer responses
function init() {
    inquirer
        .prompt(questions)
        .then((response) => {
            const newManager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber);

            writeToFile("index.html", generateHtml(newManager));
        });
}

// Write new file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error) => {
        if (error) {
            console.error(error);
        }
    });
}

// Generate HTML
function generateHtml(manager) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="./src/reset.css">
        <link rel="stylesheet" href="./src/style.css">
        <title>Document</title>
    </head>
    
    <body>
        
    </body>
    
    </html>`;
}

init();