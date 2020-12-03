const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

function newEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: "Enter new employee type: ",
            name: "type",
            choices: ["Manager", "Intern", "Engineer"]
        },
    ]).then((response) => {
        if (response.type === "Manager") {
            newManager();
        }
        if (response.type === "Intern") {
            newIntern();
        }
        if (response.type === "Engineer") {
            newEngineer();
        }
    });
}
function newManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee name: ",
            name: "name",
        },
        {
            type: "input",
            message: "Enter employee ID: ",
            name: "id",
        },
        {
            type: "input",
            message: "Enter employee email: ",
            name: "email",
        },
        {
            type: "input",
            message: "Enter employee office number: ",
            name: "officeNumber",
        },
        {
            type: "list",
            message: "Add another employee? ",
            name: "another",
            choices: ["Yes", "No"]
        },

    ]).then((response) => {
        const mgr = new Manager(response.name, response.id, response.email, response.officeNumber);
        team.push(mgr);
        if (response.another === "No") {
            teamFull();
        } else {
            newEmployee();
        }
    });
}

function newIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee name: ",
            name: "name",
        },
        {
            type: "input",
            message: "Enter employee ID: ",
            name: "id",
        },
        {
            type: "input",
            message: "Enter employee email: ",
            name: "email",
        },
        {
            type: "input",
            message: "Enter employee's current school': ",
            name: "school",
        },
        {
            type: "list",
            message: "Add another employee? ",
            name: "another",
            choices: ["Yes", "No"]
        },

    ]).then((response) => {
        const itrn = new Intern(response.name, response.id, response.email, response.school);
        team.push(itrn);
        if (response.another === "No") {
            teamFull();
        } else {
            newEmployee();
        }
    });
}
function newEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee name: ",
            name: "name",
        },
        {
            type: "input",
            message: "Enter employee ID: ",
            name: "id",
        },
        {
            type: "input",
            message: "Enter employee email: ",
            name: "email",
        },
        {
            type: "input",
            message: "Enter employee github: ",
            name: "github",
        },
        {
            type: "list",
            message: "Add another employee? ",
            name: "another",
            choices: ["Yes", "No"]
        },

    ]).then((response) => {
        const egr = new Engineer(response.name, response.id, response.email, response.github);
        team.push(egr);

        if (response.another === "No") {
            teamFull();
        } else {
            newEmployee();
        }
    });
}

function teamFull(){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(team), "utf8");
};

newEmployee();
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
