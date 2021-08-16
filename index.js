const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

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
    {
        type: "list",
        message: "Choose a new team member, or choose done if there are no more members:",
        choices: ["Engineer", "Intern", "Done"],
        name: "next",
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

// Initialize inquirer, write HTML with inquirer responses
function init() {
    inquirer
        .prompt(managerQuestions)
        .then((response) => {
            // Create empty employee array
            let employeeArray = [];

            // Create new manager from inquirer responses
            let newManager = new Manager(response.name, response.id, response.email, response.officeNumber);

            // If user is not done creating team,
            if (response.next !== "Done") {
                // If user chooses engineer,
                if (response.next === "Engineer") {
                    inquirer
                        .prompt(engineerQuestions)
                        .then((response) => {
                            // Create new engineer from inquirer responses, push to employeeArray
                            employeeArray.push(new Engineer(response.name, response.id, response.email, response.github));

                            // Write index.html file
                            writeToFile("index.html", generateHtml(generateCardHtml(newManager, employeeArray)));
                        })
                } 
                // If user chooses intern,
                else if (response.next === "Intern") {
                    inquirer
                        .prompt(internQuestions)
                        .then((response) => {
                            // Create new intern from inquirer responses, push to employeeArray
                            employeeArray.push(new Intern(response.name, response.id, response.email, response.school));

                            // Write index.html file
                            writeToFile("index.html", generateHtml(generateCardHtml(newManager, employeeArray)));
                        })
                }
            } else {
                // Write index.html file
                writeToFile("index.html", generateHtml(generateCardHtml(newManager, employeeArray)));
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
function generateCardHtml(manager, employeeArray) {
    // Create empty card array
    let cardArray = [];

    // Create new arrays for engineers and interns
    let engineerArray = employeeArray.filter(employee => employee.github);
    let internArray = employeeArray.filter(employee => employee.school);

    // Push manager card to cardArray
    cardArray.push(`<div class="card" style="width: 18rem;">
        <div class="card-header">
            ${manager.name}: ${manager.getRole()}
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Employee ID: ${manager.id}</li>
            <li class="list-group-item">Email: ${manager.email}</li>
            <li class="list-group-item">Office number: ${manager.officeNumber}</li>
        </ul>
    </div>`);

    // Push engineer cards to cardArray
    for (let i = 0; i < engineerArray.length; i++) {
        cardArray.push(`\n  <div class="card" style="width: 18rem;">
        <div class="card-header">
            ${engineerArray[i].name}: ${engineerArray[i].getRole()}
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Employee ID: ${engineerArray[i].id}</li>
            <li class="list-group-item">Email: ${engineerArray[i].email}</li>
            <li class="list-group-item">GitHub username: ${engineerArray[i].github}</li>
        </ul>
    </div>`);
    }

    // Push intern cards to cardArray
    for (let i = 0; i < internArray.length; i++) {
        cardArray.push(`\n  <div class="card" style="width: 18rem;">
        <div class="card-header">
            ${internArray[i].name}: ${internArray[i].getRole()}
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Employee ID: ${internArray[i].id}</li>
            <li class="list-group-item">Email: ${internArray[i].email}</li>
            <li class="list-group-item">School: ${internArray[i].school}</li>
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
    <link rel="stylesheet" href="./src/reset.css">
    <link rel="stylesheet" href="./src/style.css">
    <title>Document</title>
</head>

<body>
    <header>
        <h1>My Team</h1>
    </header>

    <main>
        ${cardArray}
    </main>
</body>
    
</html>`;
}

init();