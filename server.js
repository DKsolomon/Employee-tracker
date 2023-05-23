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
      .prompt([
          {
              type: 'list',
              message: 'What would you like to do?',
              name: '',
              choices: [
                  'View all departments',
                  'View all roles',
                  'View all employees',
                  'Add a department',
                  'Add a role',
                  'Add an employee',
                  'Update an employee role',
                  'Quit'
              ]
            }
          ])
        };