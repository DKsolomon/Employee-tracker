const db = require ('./db/connection')
const inquirer = require('inquirer')
require('console.table')

// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
//   },
//   console.log(`Connected to the employee_db database.`)
// );



function init() {
  inquirer
    .prompt({
      
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
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
        .then(answer => {
          let option = answer.option
          switch(option) {
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
                  quit() ;
                  break;
           }
      });
  };
  
  
function viewDepartments() {
  let query = 'SELECT * FROM departments';
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function viewRoles() {
  let query = 'SELECT * FROM roles';
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init()
  });
}

function viewEmployees() {
  let query = 'SELECT * FROM employees';
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res)
    init()
  });
}

function addDepartment() {
  inquirer
      .prompt({
          name: 'name',
          type: 'input',
          message: 'Enter the name of the department:'
      })
      .then(function (answer) {
        let query = 'INSERT INTO departments SET ?';
          db.query(query, { name: answer.name }, function (err, res) {
                  if (err) throw err;
                  console.log(`\n${res.affectedRows}\n`);
                  init();
              }
          );
      });
}

function quit() {
  console.log('goodbye')
  process.exit();
}
init();