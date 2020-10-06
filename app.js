const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "teamOutput");
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


  function Teamfn() {
    if(arr.length >=4){
      return  Defaultfn();
    }
       inquirer.prompt([
       {
         type: "list",
         message: "What type of team you would like to add?",
         name: "select",
         choices: [
           "Engineer",
           "Intern",
           "Done"
         ]
       }
       
       ]).then(teamChoice => {
      
      
         switch(teamChoice.choice){
           case `Engineer`:
             Engineerfn();
            
             break;
            
           case `Intern`:
           
             Internfn();
            
             break;
 
          default:
             Defaultfn();
             break;
 
           }
         
         })
         .catch(function(err) {
         console.log(err);
       });
     }
