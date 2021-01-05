DROP DATABASE IF EXISTS employeeManagerDB;
CREATE database employeeManagerDB;
USE employeeManagerDB;
CREATE TABLE department(
  id INT AUTO_INCREMENT,
  name VARCHAR(50),
  PRIMARY KEY (id)
);
CREATE TABLE role(
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(15, 2),
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE
  SET
    NULL
);
CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR (30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);