const connection = require("./connection");
//Getting  all the queries necessary to export
module.exports = {
  getDepartment() {
    return connection.query(`SELECT * FROM department`);
  },
  getRole() {
    return connection.query(
      `SELECT 
       r.id,
       r.title,
       r.salary,
       d.name
       
                              
       FROM role AS r

       LEFT JOIN department AS d
       ON r.department_id = d.id`
    );
  },
  getEmployee() {
    return connection.query(
      `SELECT 
       e.id,
       e.first_name, 
       e.last_name,
       r.id,
       r.title,
       r.salary,
       d.name,
       d.id,
       CONCAT(e2.first_name, " " ,e2.last_name) AS "manager name"
                              
       FROM employee AS e

       LEFT JOIN role AS r
       ON e.role_id = r.id

       LEFT JOIN department AS d
       ON r.department_id = d.id

       LEFT JOIN employee AS e2 
       ON e.manager_id = e2.id`
    );
  },
  getManager(data) {
    return connection.query(
      `SELECT * FROM employees WHERE manager_id IS NULL`,
      data
    );
  },
  addRole(data) {
    return connection.query(
      `INSERT INTO role SET ?`,

      {
        id: data.id,
        title: data.title,
        salary: data.salary,
        department_id: data.department_id,
      }
    );
  },
  addEmployee(data) {
    return connection.query("INSERT INTO employee SET ?", {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      role_id: data.role_id,
      manager_id: data.manager_id,
    });
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
      "UPDATE employee SET ? WHERE ?",

      [
        {
          role_id: data.role_id,
        },
        {
          id: data.id,
        },
      ]
    );
  },

  deleteDep(data) {
    return connection.query("DELETE FROM department WHERE id=?", {
      id: data.id,
    });
  },

  removeEmployee(data) {
    return connection.query("DELETE FROM employee WHERE id=?", data);
  },
  removeRole(data) {
    return connection.query("DELETE FROM role WHERE id=?", data);
  },
  // viewBudget(data) {
  //   return connection.query("SELECT SUM (salary) FROM role", data);
  // },
};
