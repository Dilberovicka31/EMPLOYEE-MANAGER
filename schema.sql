DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;
USE employeesDB;
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
  FOREIGN KEY role(department_id) REFERENCES department(id)
);
CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR (30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  CONSTRAINT manager_ref FOREIGN KEY (manager_id) REFERENCES employee(id)
);