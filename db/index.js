const connection = require("./connection");

module.exports = {
  getDepartment() {
    return connection.query("SELECT * FROM department");
  },
  getRole() {
    return connection.query("SELECT * FROM role");
  },
  getEmployee() {
    return connection.query("SELECT * FROM employee");
  },
  addRole(data) {
    return connection.query(
      "INSERT INTO role SET ?",

      {
        id: data.id,
        title: data.title,
        salary: data.salary,
        department_id: data.department_id,
      }
    );
  },
  addEmployee(data) {
    return connection.query(
      "INSERT INTO employee SET ?",

      {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        role_id: data.role_id,
        manager_id: data.manager_id,
      }
    );
  },
};
