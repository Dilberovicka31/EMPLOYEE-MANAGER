const db = require("./db");
const connection = require("./db/connection");
const inquirer = require("inquirer");
const { addRole, addEmployee, addDepartment, joinDepId } = require("./db");

db.getDepartment().then((result) => {
  console.table(result);
});

//List of choices to prompt the user
function start() {
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
        "DELETE_DEPARTMENT",
        "DELETE_ROLE",
        "DELETE_EMPLOYEE",
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
        case "CREATE_EMPLOYEE":
          addNewEmployee();
          break;
        case "CREATE_DEPARTMENT":
          addNewDepartment();
          break;

        case "UPDATE_EMPLOYEE_ROLE":
          updateNewRole();
          break;

        case "DELETE_DEPARTMENT":
          deleteDepartment();
          break;

        default:
          connection.end();
      }
    });
}

start();

function viewDep() {
  db.getDepartment().then((result) => {
    console.table(result);
    start();
  });
}

function viewRole() {
  db.getRole().then((result) => {
    console.table(result);
    start();
  });
}
function viewEmployee() {
  db.getEmployee().then((result) => {
    console.table(result);
    start();
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
          name: "department_id",
          choices: departmentOptions,
        },
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
        console.table(res);
        addRole(res);

        start();
      });
  });
}

function addNewEmployee() {
  db.getEmployee().then((employee) => {
    const employeeList = employee.map((employee) => ({
      value: employee.id,
      name: employee.first_name + " " + employee.last_name,
    }));
    db.getRole().then((role) => {
      const roleList = role.map((role) => ({
        value: role.id,
        name: role.title,
      }));

      console.log(employeeList);

      inquirer
        .prompt([
          {
            message: "What is employee first name ?",
            type: "input",
            name: "first_name",
          },
          {
            message: "What is employee last name?",
            type: "input",
            name: "last_name",
          },
          {
            message: "What is employees role?",
            type: "list",
            name: "role_id",
            choices: roleList,
          },
          {
            message: "Who is the employees manager?",
            type: "list",
            name: "manager",
            choices: employeeList,
          },
        ])
        .then((res) => {
          addEmployee(res);
          console.table(res);
          start();
        });
    });
  });
}

function addNewDepartment() {
  inquirer
    .prompt([
      {
        message: "What department would you like to add?",
        type: "input",
        name: "name",
      },
    ])
    .then((res) => {
      addDepartment(res);
      console.table(res);
      // start();
    });
}

function updateNewRole() {
  db.updateRole().then((role) => {
    const roleItem = role.map((role) => ({
      name: role.title,
      value: role.id,
      //   value: role.salary,s
    }));
    updateRole(role);
    console.log(roleItem);
    //
  });
}
function deleteDepartment() {
  db.getDepartment().then((department) => {
    const departmentId = department.map((department) => ({
      value: department.id,
      name: department.name,
    }));
    inquirer
      .prompt([
        {
          message: "What department would you like to delete?",
          type: "list",
          name: "department_id",
          choices: departmentId,
        },
      ])
      .then((res) => {
        deleteDep(res);
        console.table(res);
        start();
      });
  });
}
// start();
