const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');
const bcrypt = require('bcrypt');
const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reset_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reset_token_expiry: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
    {
        hooks: {
            // Hash the password before saving it
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            },
        },
        // indexes: [
        //     // Create a unique index on email
        //     {
        //         unique: true,
        //         fields: ['email']
        //     }],
        defaultScope: {
            attributes: { exclude: ['password'] }, // Exclude password by default
        },
        scopes: {
            withPassword: { attributes: {} }, // Scope to include the password if needed
        },
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
        paranoid: true,       // Enables `deletedAt` for soft deletes
        createdAt: 'created_at', // Map `createdAt` to `created_at`
        updatedAt: 'updated_at', // Map `updatedAt` to `updated_at`
        deletedAt: 'deleted_at', // Map `DeletedAt` to `deleted_at`
    });

module.exports = User;