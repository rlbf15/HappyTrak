const express = require('express');
const path = require('path');
const fs = require('fs');
const employeeController = require('./employeeController.js');
const app = express();
const cors = require('cors'); ///
const PORT = 3000;

app.use(express.json());
app.use(cors()) ///
app.use(express.static(path.resolve(__dirname, '../src')));


app.post('/api/survey', employeeController.createResponse, (req, res) => {
  res.status(200).json('http://localhost:3000/submitted.html'); // send result string to be displayed on submitted.html
});

app.get('/api/graph', employeeController.getGraph, (req, res) => {
  res.status(200).json(res.locals.graph);
});

const testData = [
  {
    employee_name: "Kasey Wolff",
    employee_id: 7825,  
    week_id: 2
    
},
{
    employee_name: "Matteo Diterlizzi ",
    employee_id: 9876, 
    week_id: 2
    
},
{
    employee_name: "Alejandro Flores",
    employee_id: 5689, 
    week_id: 1
    
},
{
    employee_name: "Jon Cruz",
    employee_id: 1234,  
    week_id: 2
    
},
{
  employee_name: 'Matteo Leg',
  emplooyee_id: 1234, 
  week_id: 3
  
}, 
{
  employee_name: 'Minzo ka',
  emplooyee_id: 2665, 
  week_id: 1
 }, 
 {
  employee_name: 'Carlo ke',
  emplooyee_id: 458933, 
  week_id: 4
  
}, 
{
  employee_name: 'Fabio le',
  emplooyee_id: 46987, 
  week_id: 3
 },
 {
  employee_name: 'Pablo eg',
  emplooyee_id: 1234, 
  week_id: 4
  
}, 
{
  employee_name: 'Ke ka',
  emplooyee_id: 56987,  
  week_id: 2
 },
 {
  employee_name: 'Matteo Leg',
  emplooyee_id: 1234, 
  week_id: 1
  
}, 
{
  employee_name: 'Minzo ka',
  emplooyee_id: 56987, 
  week_id: 2
 }
]

app.get('/api/employees', employeeController.getEmployees, (req, res) => {
  // res.status(200).json(res.locals.employees);
  res.status(200).json(testData);
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
