INSERT INTO
  department(name)
VALUES
  ("Accounting"),
  ("Development"),
  ("HR");
INSERT INTO
  role(title, salary, department_id)
VALUES
  ("Engineer", 80000.00, 2),
  ("Accountant", 60000.00, 1),
  ("HR Representative", 50000.00, 3);
INSERT INTO
  employee(first_name, last_name, role_id, manager_id)
VALUES
  ("Mija", "Dilberovic", 1, null),
  ("Tony", "Tan", 6, null),
  ("Mark", "Mullholland", 1, 1),
  ("Molly", "Mullholland", 2, 1);