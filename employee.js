const db = require("./db");
const connection = require("./db/connection");
const inquirer = require("inquirer");
const { addRole } = require("./db");

db.getDepartment().then((result) => {
  //   console.log(result);
});

function askUser() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "VIEW_DEPARTMENT",
        "VIEW_ROLE",
        "VIEW_EMPLOYEE",
        "CREATE_ROLE",
        "CREATE_DEPARTMENT",
        "CREATE_EMPLOYEE",
        "UPDATE_EMPLOYEE_ROLE",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "VIEW_DEPARTMENT":
          viewDep();
          break;

        case "VIEW_ROLE":
          viewRole();
          break;

        case "VIEW_EMPLOYEE":
          viewEmployee();
          break;

        case "CREATE_ROLE":
          createRole();
          break;
        default:
          connection.end();
      }
    });
}

askUser();

function viewDep() {
  db.getDepartment().then((result) => {
    console.table(result);
    askUser();
  });
}

function viewRole() {
  db.getRole().then((result) => {
    console.table(result);
    askUser();
  });
}
function viewEmployee() {
  db.getEmployee().then((result) => {
    console.table(result);
    askUser();
  });
}
function createRole() {
  db.getDepartment().then((department) => {
    const departmentOptions = department.map((department) => ({
      value: department.id,
      name: department.name,
    }));

    inquirer
      .prompt([
        {
          message: "What department is this role for?",
          type: "list",
          name: "name",
          choices: departmentOptions,
        },
      ])
      .then((res) => {
        addRole(res);
        addNewRole();
      });
  });
}
function addNewRole() {
  inquirer
    .prompt([
      {
        message: "What is the new role title?",
        type: "input",
        name: "title",
      },
      {
        message: "What is the salary for the role?",
        type: "input",
        name: "salary",
      },
    ])
    .then((res) => {
      addRole(res);
    });
}
