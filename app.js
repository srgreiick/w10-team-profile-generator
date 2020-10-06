const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "teamOutput");
const outputPath = path.join(OUTPUT_DIR, "team.html");

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
        message: "Manager name?",
        validate: answerValidation
      },
      {
        type: "input",
        message: "Manager Id?",
        name: "managerId",
        validate: idValidation
      },
      {
        type: "input",
        message: "Manager's email?",
        name: "managerEmail",
        validate: emailValidation
      },
      {
        type: "input",
        message: "Manager's office number?",
        name: "managerNo",
        validate: phNoValidation

      }
    
    ]).then(function(answers){
   
         const manager = new Manager(answers.ManagerName ,answers.managerId, answers.managerEmail, answers.managerNo )
         employee.push(manager);
         empIdArray.push(answers.managerId);
         Teamfn();

        }) .catch(function(err) {
      console.log(err);
    });
  }


  function Teamfn() {
    if(employee.length >=4){
     console.log(`Thank you for building your team`);
      return  Defaultfn();
    }
       inquirer.prompt([
       {
         type: "list",
         message: "Which type of team you would like to add?",
         name: "choice",
         choices: [
           "Engineer",
           "Intern",
           "No more team members"
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
             console.log(`Thank you for building your team`);
             Defaultfn();
             break;
 
           }
         
         })
         .catch(function(err) {
         console.log(err);
       });
     }

     function Engineerfn(){

        inquirer.prompt([
          {
             type: "input",
             message: "Engineer's Name?",
             name: "engineerName",
             validate: answerValidation
          },
          {
              type: "input",
              message: "Engineer's Id?",
              name: "engineerId",
              validate: idValidation
           },
           {
              type: "input",
              message: "Engineer's Email?",
              name: "engineerEmail",
              validate: emailValidation
           },
           {
              type: "input",
              message: "Engineer's Github Username?",
              name: "engineerGithub",
           },
          ]).then(function(answers){
            const engineer = new Engineer(answers.engineerName ,answers.engineerId, answers.engineerEmail, answers.engineerGithub )
            employee.push(engineer);
            empIdArray.push(answers.engineerId);
            Teamfn();
  
           }) .catch(function(err) {
         console.log(err);
       });
      }

      function Internfn(){

        inquirer.prompt([
          {
             type: "input",
             message: "Intern's Name?",
             name: "internName",
             validate: answerValidation
          },
          {
              type: "input",
              message: "Intern's Id?",
              name: "internId",
              validate: idValidation
           },
           {
              type: "input",
              message: "Intern's Email?",
              name: "internEmail",
              validate: emailValidation
           },
           {
              type: "input",
              message: "Intern's School?",
              name: "internSchool",
              validate: answerValidation
           },
          
          ]).then(function(answers){
            const intern = new Intern(answers.internName ,answers.internId, answers.internEmail, answers.internSchool )
  
            employee.push(intern);
            empIdArray.push(answers.internId);
            Teamfn() 
           }) .catch(function(err) {
             console.log(err);
       });
      }

      function Defaultfn(){
        fs.writeFileSync(outputPath,  render(employee), function(err) {
          if (err) {
            return console.log(err);
          }
        });
      }

      //-----------------the following validation system is credited to Yakini-------------
      function answerValidation(value){
        if(value!="" && value.match('[a-zA-Z][a-zA-Z]+$'))return true;
        else return `Please enter valid detail`;
      };
 
      function idValidation(value){
      const pass = value.match(/^[1-9]\d*$/);
    //  console.log(pass);
      if (pass) {
      
          if(empIdArray.includes(value)){
            return "Please select different ID..Already in Use!!";
          }else{ 
            return true;
          };
    }else return "Please enter valid number.";
  };
    
     // To validate whether phNo is correct . If not, return 'Please enter valid office number' message
     function phNoValidation(value){
      const id = /^[1-9]\d*$/;
     
      if (value.match(id)) {
        return true;
      }
      return "Please enter valid office number.";
    }

    //To validate whether the email entered is correct. If not, return 'Please enter valid email' message
    function emailValidation(value){

      var mailformat = /\S+@\S+\.\S+/;
      if(value.match(mailformat))
       return true;
     
      else
      return `Please enter valid email`;
    }

    //To validate the GitHub account. If not valid, return 'Invalid user message'

    
      Managerfn();