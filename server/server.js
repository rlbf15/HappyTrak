const express = require('express');
const path = require('path');
const employeeController = require('./employeeController.js');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/survey', employeeController.createResponse, (req, res) => {
  res.status(200).send('Survey response recorded. Thank you!');
});

app.get('/api/graph', employeeController.getGraph, (req, res) => {
  res.status(200).json(res.locals.graph);
});

app.use('/api', (req, res) => {
  res.status(404).send('cannot get page');
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
