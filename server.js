const mysql = require('mysql2');
const inquirer = require('inquirer')

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the employee_db database.`)
);

function init(){
  inquirer
      .prompt({
          
          type: 'list',
          message: 'What would you like to do?',
          name: 'options',
          choices: [
              'View all departments',
              'View all roles',
              'View all employees',
              'Add A department',
              'Add A role',
              'Add an employee',
              'Update an employee role',
              'Quit'
          ]
        })
        .then(function(answer) {

          switch(answer.action) {
              case 'View all departments':
                  viewDepartments();
                  break;
                  
              case 'View all roles':
                  viewRoles();
                  break;
      
              case 'View all employees':
                  viewEmployees();
                  break;
      
              case 'Add A department':
                  addDepartment();
                  break;
      
              case 'Add a role':
                   addRole();
                   break;
      
              case 'Add an employee':
                  addEmployee();
                  break;
      
              case 'Update an employee role':
                  updateEmployeeRole();
                  break;
      
              case 'Quit':
                  connection.end();
                  break;
          }
            })
  };
        
function viewDepartments() {
  let query = "SELECT * FROM departments";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function viewRoles() {
  let query = "SELECT * FROM roles";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init()
  });
}

function viewEmployees() {
  let query = "SELECT * FROM employees";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res)
    init()
  });
}
init();