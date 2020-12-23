DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;
USE employeesDB;
CREATE TABLE department(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  PRIMARY KEY (position)
);
CREATE TABLE role(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(5, 2),
  department id INT,
  PRIMARY KEY (position)
);
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR (30),
  role_id INT,
  manager_id INT,
)