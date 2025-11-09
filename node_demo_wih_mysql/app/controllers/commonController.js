'use strict';
const User = require('../models/user');
const sendTestEmail = require('../helper/sendEmail');// create express app
const upload = require('../helper/fileUploadImage'); // Import the helper

const common_helper = require('../helper/common');

exports.fileUpload = function (req, res) {
    upload.single('file')(req, res, (err) => {
        if (err) {
            console.error('Error uploading file:', err.message);
            return res.status(500).send({ error: 'Failed to upload file', details: err.message });
        }
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }
        res.status(200).send({ message: 'File uploaded successfully', file: req.file });
    });
};
exports.mailsendDemo = async (req, res) => {
    try {
        const response = await sendTestEmail('ankita@yopmail.com', 'Test Email', 'Hello! This is a test email sent via Mailtrap.');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.xlsExport = async (req, res) => {
    /// Import the 'url' module
    const url = require('url');
    console.log("url-->" + url);
    console.log(url);
    // Sample URL
    const myUrl = 'https://example.com/some/path?name=test';

    // Parse the URL
    const parsedUrl = url.parse(myUrl);

    // Get the base URL (protocol + hostname)
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;
    console.log('Base URL:', baseUrl);

    // Get the path
    const path = parsedUrl.path;
    console.log('Path:', path);
    // try {
    //     const XLSX = require('xlsx');
    //     const fs = require('fs');

    //     // Example data to export
    //     const data = [
    //         { Name: 'John Doe', Age: 28, Profession: 'Engineer' },
    //         { Name: 'Jane Smith', Age: 34, Profession: 'Doctor' },
    //         { Name: 'Sam Brown', Age: 23, Profession: 'Teacher' }
    //     ];

    //     // Create a workbook and a worksheet
    //     const workbook = XLSX.utils.book_new();
    //     const worksheet = XLSX.utils.json_to_sheet(data);

    //     // Append the worksheet to the workbook
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    //     // Write the workbook to a file
    //     const fileName = './public/excel/example.xlsx';
    //     XLSX.writeFile(workbook, fileName);

    //     res.status(200).json({ error: false, message: '', data: fileName });
    // }
    // catch (err) {
    //     res.status(500).json({ error: true, message: err.message });
    // }

};

exports.queueDemo = async (req, res) => {
    try {
        console.log("Queue demo");
        //https://www.youtube.com/watch?v=wAEMXVcRbgU
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};