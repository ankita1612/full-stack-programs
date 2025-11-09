
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');
const Employee = sequelize.define("employees", {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DOB: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    designation: {
        type: DataTypes.ENUM('Manager', 'Developer', 'Designer', 'Tester'),
        allowNull: false
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive'),
        allowNull: false
    },
},
    {
        indexes: [
            // Create a unique index on email
            {
                unique: true,
                fields: ['email']
            }],
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
        paranoid: true,       // Enables `deletedAt` for soft deletes
        createdAt: 'created_at', // Map `createdAt` to `created_at`
        updatedAt: 'updated_at', // Map `updatedAt` to `updated_at`
        deletedAt: 'deleted_at', // Map `DeletedAt` to `deleted_at`
    });

//The sequelize.sync() method is used to synchronize your Sequelize models with the database. It ensures that the database tables match the structure defined in your Sequelize models .If not exist then it will create   
// sequelize.sync().then(() => {
//     console.log('Book table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table : ', error);
// });
module.exports = Employee;


// 'use strict';
// var dbConn = require('../../config/db.config');
// //Employee object create
// var Employee = function (employee) {
//     this.first_name = employee.first_name;
//     this.last_name = employee.last_name;
//     this.email = employee.email;
//     this.phone = employee.phone;
//     this.organization = employee.organization;
//     this.designation = employee.designation;
//     this.salary = employee.salary;
//     this.status = employee.status ? employee.status : 1;
//     this.created_at = new Date();
//     this.updated_at = new Date();
// };
// Employee.create = function (newEmp, result) {
//     dbConn.query("INSERT INTO employees set ?", newEmp, function (err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else {
//             console.log(res.insertId);
//             result(null, res.insertId);
//         }
//     });
// };
// Employee.findById = function (id, result) {
//     dbConn.query("Select * from employees where id = ? ", id, function (err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else {
//             result(null, res);
//         }
//     });
// };
// Employee.findAll = function (result) {
//     dbConn.query("Select * from employees", function (err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//         }
//         else {
//             console.log('employees : ', res);
//             result(null, res);
//         }
//     });
// };
// Employee.update = function (id, employee, result) {
//     dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name, employee.last_name, employee.email, employee.phone, employee.organization, employee.designation, employee.salary, id], function (err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//         } else {
//             result(null, res);
//         }
//     });
// };
// Employee.delete = function (id, result) {
//     dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//         }
//         else {
//             result(null, res);
//         }
//     });
// };
// module.exports = Employee;