// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee{
 constructor(name,id, email, gitHubUser){
    super(name,id,email);
    this.github = gitHubUser;
    }
        
getRole () {
return `Manager`;
} 
    
getGithub(){
    return this.github;
    }
}
module.exports = Manager;