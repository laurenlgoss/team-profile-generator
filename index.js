const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

// Create empty employee array
let employeeArray = [];

const nextQuestion = [{
    type: "list",
    message: "Choose a new team member, or choose done if there are no more members:",
    choices: ["Engineer", "Intern", "Done"],
    name: "next",
}];

// Create an array of questions to gather manager information
const managerQuestions = [
    {
        type: "input",
        message: "Enter team manager's name:",
        name: "name",
    },
    {
        type: "input",
        message: "Enter team manager's employee ID:",
        name: "id",
    },
    {
        type: "input",
        message: "Enter team manager's email address:",
        name: "email",
    },
    {
        type: "input",
        message: "Enter team manager's office number:",
        name: "officeNumber",
    },
];

// Create an array of questions to gather engineer information
const engineerQuestions = [
    {
        type: "input",
        message: "Enter engineer's name:",
        name: "name",
    },
    {
        type: "input",
        message: "Enter engineer's employee ID:",
        name: "id",
    },
    {
        type: "input",
        message: "Enter engineer's email address:",
        name: "email",
    },
    {
        type: "input",
        message: "Enter engineer's GitHub username:",
        name: "github",
    },
];

// Create an array of questions to gather intern information
const internQuestions = [
    {
        type: "input",
        message: "Enter intern's name:",
        name: "name",
    },
    {
        type: "input",
        message: "Enter intern's employee ID:",
        name: "id",
    },
    {
        type: "input",
        message: "Enter intern's email address:",
        name: "email",
    },
    {
        type: "input",
        message: "Enter intern's school:",
        name: "school",
    },
];

function mainMenu() {
    inquirer
        .prompt(nextQuestion)
        .then((response) => {
            // If user is not done creating team,
            if (response.next !== "Done") {
                // If user chooses engineer,
                if (response.next === "Engineer") {
                    inquirer
                        .prompt(engineerQuestions)
                        .then((response) => {
                            // Create new engineer from inquirer responses, push to employeeArray
                            let newEngineer = new Engineer(response.name, response.id, response.email, response.github);
                            employeeArray.push(newEngineer);

                            return mainMenu();
                        })
                }
                // If user chooses intern,
                else if (response.next === "Intern") {
                    inquirer
                        .prompt(internQuestions)
                        .then((response) => {
                            // Create new intern from inquirer responses, push to employeeArray
                            let newIntern = new Intern(response.name, response.id, response.email, response.school);
                            employeeArray.push(newIntern);

                            return mainMenu();
                        })
                }
            } else {
                // Write index.html file
                writeToFile("./dist/index.html", generateHtml(generateCardHtml(employeeArray)));
            }
        })
}

// Initialize inquirer, write HTML with inquirer responses
function init() {
    inquirer
        .prompt(managerQuestions)
        .then((response) => {
            // Create new manager from inquirer responses
            let newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
            employeeArray.push(newManager);

            return mainMenu();
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
function generateCardHtml(employeeArray) {
    // Create empty card array
    let cardArray = [];

    // Create new arrays for engineers and interns
    let manager = employeeArray.filter(employee => employee.getRole() === "Manager");
    let engineerArray = employeeArray.filter(employee => employee.getRole() === "Engineer");
    let internArray = employeeArray.filter(employee => employee.getRole() === "Intern");

    // Push manager card to cardArray
    cardArray.push(`<div class="card col-sm" style="width: 18rem;">
                    <div class="card-header">
                        ${manager[0].getName()}: ${manager[0].getRole()}
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Employee ID: ${manager[0].getId()}</li>
                        <li class="list-group-item">Email: ${manager[0].getEmail()}</li>
                        <li class="list-group-item">Office Number: ${manager[0].officeNumber}</li>
                    </ul>
                </div>`);

    // Push engineer cards to cardArray
    for (let i = 0; i < engineerArray.length; i++) {
        cardArray.push(`\n                <div class="card col-sm" style="width: 18rem;">
                    <div class="card-header">
                        ${engineerArray[i].getName()}: ${engineerArray[i].getRole()}
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Employee ID: ${engineerArray[i].getId()}</li>
                        <li class="list-group-item">Email: ${engineerArray[i].getEmail()}</li>
                        <li class="list-group-item">GitHub username: ${engineerArray[i].getGithub()}</li>
                    </ul>
                </div>`);
    }

    // Push intern cards to cardArray
    for (let i = 0; i < internArray.length; i++) {
        cardArray.push(`\n                <div class="card col-sm" style="width: 18rem;">
                    <div class="card-header">
                        ${internArray[i].getName()}: ${internArray[i].getRole()}
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Employee ID: ${internArray[i].getId()}</li>
                        <li class="list-group-item">Email: ${internArray[i].getEmail()}</li>
                        <li class="list-group-item">School: ${internArray[i].getSchool()}</li>
                    </ul>
                </div>`);
    }

    return cardArray;
}

// Generate HTML
function generateHtml(cardArray) {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
    <link rel="stylesheet" href="./reset.css">
    <link rel="stylesheet" href="./style.css">
    <title>Document</title>
</head>

<body>
    <header>
        <h1>My Team</h1>
    </header>

    <main>
        <div class="container">
            <div class="row">
                ${cardArray}
            </div>
        </div>
    </main>
</body>
    
</html>`;
}

init();