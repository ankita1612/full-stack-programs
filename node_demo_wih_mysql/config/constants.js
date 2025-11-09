require('dotenv').config();

const CONSTANTS = {
    EMAIL_ALREADY_EXIST: 'Email already exist.',
    USER: {
        NAME_IS_REQUIED: 'Name is equired',
        USER_CREATED_SUCCESS: 'User ceated successfully.',
        USER_UPDATED_SUCCESS: 'User updated successfully.',
        USER_DELETE_SUCCESS: 'User deleted successfully.',
        INVALID_INPUT: 'Invalid input data.',
        USER_NOT_FOUND: 'User not found.',
        USER_NOT_FOUND_FOR_ID: 'User not found for this id.',
        EMAIL_ALREADY_EXIST: 'Email already exist. please try another.',
        INVALID_PASSWORD: 'Invalid password!',
        SIGNUP_SUCCESS: 'Signup successfully!',
    },
    EMPLOYEE: {
        NAME_IS_REQUIED: 'Name is equired',
        EMPLOYEE_CREATED_SUCCESS: 'Employee ceated successfully.',
        EMPLOYEE_DELETE_SUCCESS: 'Employee deleted successfully.',
        INVALID_INPUT: 'Invalid input data.',
        EMPLOYEE_NOT_FOUND: 'Employee not found.',
        EMPLOYEE_NOT_FOUND_FOR_ID: 'Employee not found for this id.',
        EMAIL_ALREADY_EXIST: 'Email already exist. please try another.',
        EMPLOYEE_UPDATED_SUCCESS: 'Employee updated successfully.',
    },
    DEPARTMENT: {
        NAME_IS_REQUIED: 'Name is equired',
        DEPARTMENT_CREATED_SUCCESS: 'Department ceated successfully.',
        DEPARTMENT_UPDATED_SUCCESS: 'Department updated successfully.',
        DEPARTMENT_DELETE_SUCCESS: 'Department deleted successfully.',
        DEPARTMENT_NOT_FOUND: 'Department not found.',
        DEPARTMENT_NOT_FOUND_FOR_ID: 'Department not found for this id.',
    },
};
module.exports = CONSTANTS;
