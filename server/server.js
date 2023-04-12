const express = require('express');
const path = require('path');
const fs = require('fs');
const employeeController = require('./employeeController.js');
const employerController = require('./controllers/employerController');
const app = express();
const cors = require('cors'); ///
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()) ///
app.use(express.static(path.resolve(__dirname, '../src')));

app.post('/api/createEmployer',
  // () => {console.log('post req'); next()},
  employerController.createEmployer,
  (req, res) => {
    res.status(200).json(res.locals.employer)
  }
);

app.post('/api/confirmEmployer',
  employerController.verifyEmployer,
  // sessionController.isLoggedIn,
  (req, res) => {
    // console.log('confirmEmployer')
    return res.status(200).json(res.locals.isVerified)
  }
);

app.post('/api/survey', employeeController.createResponse, (req, res) => {
  res.status(200).json('http://localhost:3000/submitted.html'); // send result string to be displayed on submitted.html
});

app.get('/api/graph', employeeController.getGraph, (req, res) => {
  res.status(200).json(res.locals.graph);
});

app.get('/api/reset', employeeController.resetAndPopulateData, (req, res) => {
  res.status(200).send('Survey data reset and repopulated');
});

app.post('/api/reset-table', employeeController.resetTable, (req, res) => {
  res.status(200).send('Table reset successfully.');
});

app.use('/api', (req, res) => {
  res.status(404).send('Cannot get page');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

module.exports = app;
