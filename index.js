const fs = require("fs");
const inquirer = require("inquirer");

const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

// Create an array of questions for user input
const managerQuestions = [
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
    {
        type: "list",
        message: "Choose a new team member, or choose done if there are no more members:",
        choices: ["Engineer", "Intern", "Done"],
        name: "next",
    },
];

const engineerQuestions = [
    {
        type: "input",
        message: "Enter engineer's name:",
        name: "engineerName",
    },
    {
        type: "input",
        message: "Enter engineer's employee ID:",
        name: "engineerId",
    },
    {
        type: "input",
        message: "Enter engineer's email address:",
        name: "engineerEmail",
    },
    {
        type: "input",
        message: "Enter engineer's GitHub username:",
        name: "engineerGithub",
    },
];

const internQuestions = [
    {
        type: "input",
        message: "Enter intern's name:",
        name: "internName",
    },
    {
        type: "input",
        message: "Enter intern's employee ID:",
        name: "internId",
    },
    {
        type: "input",
        message: "Enter intern's email address:",
        name: "internEmail",
    },
    {
        type: "input",
        message: "Enter intern's school:",
        name: "internSchool",
    },
];

// Initialize inquirer, write HTML with inquirer responses
function init() {
    inquirer
        .prompt(managerQuestions)
        .then((response) => {
            const newManager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber);

            if (response.next !== "done") {
                if (response.next === "Engineer") {
                    inquirer
                        .prompt(engineerQuestions)
                        .then((response) => {
                            writeToFile("index.html", generateHtml(newManager.name, newManager.getRole(), newManager.id, newManager.email, newManager.officeNumber));
                        })
                } else if (response.next === "Intern") {
                    inquirer
                        .prompt(internQuestions)
                        .then((response) => {
                            writeToFile("index.html", generateHtml(newManager.name, newManager.getRole(), newManager.id, newManager.email, newManager.officeNumber));
                        })
                }
            } else {
                writeToFile("index.html", generateHtml(newManager.name, newManager.getRole(), newManager.id, newManager.email, newManager.officeNumber));
            }
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

// Generate employee card HTML
function generateCardHtml(name, role, first, second, third) {
    return `<div class="card" style="width: 18rem;">
        <div class="card-header">
            ${name}: ${role}
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${first}</li>
            <li class="list-group-item">${second}</li>
            <li class="list-group-item">${third}</li>
        </ul>
    </div>`;
}

// Generate HTML
function generateHtml(name, role, first, second, third) {
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
        ${generateCardHtml(name, role, first, second, third)}
    </body>
    
    </html>`;
}

init();