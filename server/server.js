const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

//adding a thing

app.use(express.json());

app.get('/survey', (req, res) => {
  res.status(200).send('hello');
});

app.use('/', (req, res) => {
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
