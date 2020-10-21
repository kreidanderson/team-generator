// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email);
        //get rid of role
        this.github = github;
    }
   
    getRole() {
        return "Engineer";
      };
    
      getGithub() {
        return this.github;
      };


}

var engineer = new Engineer ("Bill", "1", "a@abc.com", "@billsgithub")


// console.log(engineer)
// console.log(engineer.getGithub())

module.exports = Engineer;