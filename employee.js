//requiring all the starting files and inquirer to prompt the user questions

const db = require("./db");
const connection = require("./db/connection");
const inquirer = require("inquirer");
const {
  addRole,
  addEmployee,
  addDepartment,
  updateRole,
  removeRole,
  removeEmployee,
  deleteDep,
} = require("./db");

//List of choices to prompt the user and switch care depending on the choice
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
        "VIEW_BUDGET",
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
        case "DELETE_EMPLOYEE":
          deleteEmployee();
          break;
        case "DELETE_ROLE":
          deleteRole();
          break;
        case "VIEW_BUDGET":
          viewTotalBudget();
          break;

        default:
          connection.end();
      }
    });
}

start();

//View department, roles and employees
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

//Create new role, got department options to choose from
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

//Add new employee, got the employee list and role list to display options to choose from
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
            name: "manager_id",
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

//Add new department
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
      start();
    });
}

//Update employees role
function updateNewRole() {
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
      inquirer
        .prompt([
          {
            message: "Which employee would you like to update",
            name: "id",
            type: "list",
            choices: employeeList,
          },
          {
            message: "What is the new role?",
            name: "role_id",
            type: "list",
            choices: roleList,
          },
        ])
        .then((res) => {
          updateRole(res);
          console.table(res);
          start();
        });

      //
    });
  });
}

//Delete department function
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
          name: "id",
          choices: departmentId,
        },
      ])
      .then((res) => {
        deleteDep(res.id);
        console.table(res);
        start();
      });
  });
}

//Delete employee function
function deleteEmployee() {
  db.getEmployee().then((employee) => {
    const employeeList = employee.map((employee) => ({
      value: employee.id,
      name: employee.first_name + " " + employee.last_name,
    }));
    inquirer
      .prompt([
        {
          message: "What employee would you like to remove?",
          name: "id",
          type: "list",
          choices: employeeList,
        },
      ])
      .then((res) => {
        removeEmployee(res);
        console.table(res);
        start();
      });
  });
}

//Delete role function
function deleteRole() {
  db.getRole().then((role) => {
    const roleList = role.map((role) => ({
      value: role.id,
      name: role.title,
    }));
    inquirer
      .prompt([
        {
          message: "What role would you like to remove?",
          name: "id",
          type: "list",
          choices: roleList,
        },
      ])
      .then((res) => {
        removeRole(res);
        console.table(res);
        start();
      });

    //
  });
}

// function viewTotalBudget() {
//   db.getRole().then((role) => {
//     const roleList = role.map((role) => ({
//       value: role.id,
//       name: role.salary,
//     }));

//     viewBudget(role.salary);
//     console.table();
//   });
//
