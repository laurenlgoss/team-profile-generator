const fs = require("fs");
const inquirer = require("inquirer");

const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

function init() {
    inquirer
        .prompt(questions)
        .then((response) => {
            writeToFile("index.html", generateHtml(response));
        });
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error) => {
        if (error) {
            console.error(error);
        }
    });
}

function generateHtml(response) {
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