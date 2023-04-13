//require express
const express = require('express');
//define a variable and invoke express router
const router = express.Router();

// require controllers
const employeeController = require('../controllers/employeeController.js');
const employerController = require('../controllers/employerController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');

router.post('/createEmployer',
    // () => {console.log('post req'); next()},
    employerController.createEmployer,
    (req, res) => {
        res.status(200).json(res.locals.employer)
    }
);

router.post('/confirmEmployer',
    employerController.verifyEmployer,
    sessionController.startSession,
    cookieController.setSSIDCookie,
    (req, res) => {
        // console.log('confirmEmployer')
        return res.status(200).json(res.locals.isVerified)
    }
);

router.post('/survey', employeeController.createResponse, (req, res) => {
    res.status(200).json('http://localhost:3000/submitted.html'); // send result string to be displayed on submitted.html
});

router.get('/graph', employeeController.getGraph, (req, res) => {
    res.status(200).json(res.locals.graph);
});

router.get('/attendance', employeeController.getAttendance, (req, res) => {
    res.status(200).json(res.locals.attendance);
});

router.get('/took-survey', employeeController.tookSurvey, (req, res) => {
    res.status(200).json(res.locals.tookSurvey);
});

router.get('/reset', employeeController.resetAndPopulateData, (req, res) => {
    res.status(200).send('Survey data reset and repopulated');
});

router.post('/reset-table', employeeController.resetTable, (req, res) => {
    res.status(200).send('Table reset successfully.');
});

router.use((req, res) => {
    res.status(404).send('Cannot get page');
});

module.exports = router;