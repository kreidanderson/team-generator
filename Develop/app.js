const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
var employees = [];

// first object is asking if they are an employee
const baseQuestions = [
    {
        type: "input",
        message: "What is their name?",
        name: "name",
        },
        {
        type: "input",
        message: "What is the employee's ID number?",
        name: "id",
        
        },
        {
        type: "input",
        message: "What is the employee's email address?",
        name: "email",
        },
        {
        type: "list",
         message: "What type of employee is this person?",
         choices: ["Engineer", "Manager", "Intern"],
        name: "role",
    },
]

const engineerQuestion = {
        type: "input",
        message: "What's your github username?",
        name: "github",
    };
const internQuestion = {
        type: "input",
        message: "What college or University do you go to?",
        name: "college",
        };
        
const managerQuestion = {
        type: "input",
        message: "What is your office number?",
        name: "office",
        };

const moreEmployees =  {
        type: "list",
         message: "Would you like to add another team member?",
         choices: ["yes", "no"],
        name: "another",
    };


function init() {
    inquirer.prompt(baseQuestions)
    .then
    (response => {
        if(response.role === "Intern"){
            inquirer.prompt(internQuestion).then(response2 => {
                const intern = new Intern(response.name, response.id, response.email, response2.college);
                employees.push(intern);
                writeToHtml();
                inquirer.prompt(moreEmployees).then(response3 => {
                    if (response3.another === "yes"){
                        init()
                    }
                    else if(response3.another === "no"){
                       return "Your team page is complete!"

                    }
                   

                })
        
            })
        }
        else if(response.role === "Manager"){
            inquirer.prompt(managerQuestion).then(response2 => {
                const manager = new Manager(response.name, response.id, response.email, response2.office);
                employees.push(manager);
                writeToHtml();
                inquirer.prompt(moreEmployees).then(response3 => {
                    if (response3.another === "yes"){
                        init()
                    }
                    else if(response3.another === "no"){
                        return "Your team page is complete!"
                        
                    }
                   
                })
              
            })
        }
        else if(response.role === "Engineer"){
            inquirer.prompt(engineerQuestion).then(engineerQ => {
                const engineer = new Engineer(response.name, response.id, response.email, engineerQ.github);
                employees.push(engineer);
                writeToHtml();
                inquirer.prompt(moreEmployees).then(response3 => {
                    if (response3.another === "yes"){
                        
                        init()
                    }
                    else if(response3.another === "no"){
                        return "Your team page is complete!"
                        
                    }
                    
                    
                    
                })
                
            })
        }
   

function writeToHtml(){
    fs.writeFile(outputPath, render(employees), function (err) {
            if (err) {
                return Error
            }
        });
    } 

    });


};


init();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
