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
        // department_id: department(id),
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
        role_id: role(id),
        manager_id: data.manager_id,
      }
    );
  },

  addDepartment(data) {
    return connection.query(
      "INSERT INTO department SET ?",

      {
        id: data.id,
        name: data.name,
      }
    );
  },
  updateRole(data) {
    return connection.query(
      "UPDATE role SET ? WHERE ?",

      [{ id: data.id }]
    );
  },

  // deleteDep(data) {
  //   return connection.query(
  //     "DELETE FROM department WHERE ?",

  //     [
  //       {
  //         id: data.id,
  //       },
  //     ]
  //   );
  // },
  joinDepId() {
    return connection.query(
      "SELECT * FROM role RIGHT JOIN employee USING(id)",
      "SELECT * FROM department RIGHT JOIN role USING (id)"
    );
  },
};
