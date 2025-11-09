const fs = require('fs');

// Function to log an error
function errorLog(error) {
    const timestamp = new Date().toISOString();
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const logMessage = `${timestamp} - ERROR: ${error.message}\n ${timestamp} - Line No: ${error.stack}\n`;

    // Append the error message to a log file
    const file_name = `logs/error_${formattedDate}`;
    console.log(file_name)
    console.log(logMessage)
    fs.appendFile(file_name, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}
function greetUser(name) {
    return `Hello, ${name}!`;
}

module.exports = { greetUser, errorLog };