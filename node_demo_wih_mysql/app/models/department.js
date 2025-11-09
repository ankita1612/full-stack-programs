const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');
const Department = sequelize.define('departments', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
    },
},
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
        paranoid: true,       // Enables `deletedAt` for soft deletes
        createdAt: 'created_at', // Map `createdAt` to `created_at`
        updatedAt: 'updated_at', // Map `updatedAt` to `updated_at`
        deletedAt: 'deleted_at', // Map `DeletedAt` to `deleted_at`
    });

module.exports = Department;