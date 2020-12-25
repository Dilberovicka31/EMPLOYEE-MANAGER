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
};
