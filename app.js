const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/newRenderer");

//Thank you Dilan and Yakini, I couldn't have done it without your help
const render = require("./lib/htmlRenderer");
var count = 0;
const employee = [];
const empIdArray = [];


 function Managerfn() {
   inquirer.prompt([
      {
        type: "input",
        name: "ManagerName",
        message: "What is your Manager name?",
        validate: answerValidation
      },
      {
        type: "input",
        message: "What is your Manager Id?",
        name: "managerId",
        validate: idValidation
      },
      {
        type: "input",
        message: "What is your Manager's email?",
        name: "managerEmail",
        validate: emailValidation
      },
      {
        type: "input",
        message: "What is your Manager's office number?",
        name: "managerNo",
        validate: phNoValidation

      }
    
    ]).then(function(answers){
   
         const manager = new Manager(answers.managerName ,answers.managerId, answers.managerEmail, answers.managerNo )
         employee.push(manager);
         empIdArray.push(answers.managerId);
         Teamfn();

        }) .catch(function(err) {
      console.log(err);
    });
  }
