const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

app.get('/yellow', (req, res) => {
  res.status(200).send('hello');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

module.exports = app;
