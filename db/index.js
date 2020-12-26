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
};
