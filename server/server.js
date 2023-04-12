const express = require('express');
const path = require('path');
const dataFlowController = require('./dataFlowController')
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const cors = require('cors');




const dbConnect = async () =>{
  try {
    await mongoose.connect('mongodb+srv://velocirabbit:velocirabbit@cluster0.ose86oe.mongodb.net/?retryWrites=true&w=majority', {dbName: 'happytracker'})

    console.log('connected to db')
  }catch(error) {
    console.log(error)
  }
  }

dbConnect();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static(path.resolve(__dirname, '../src')));

//login route
app.post('/login',(req, res) => {

})

//register route
app.post('/register',(req, res) => {

})

//save survery to DB
app.post('/sendSurvey', dataFlowController.saveSurvey , (req, res) => {
  res.status(200).json('data saved')
})


//get survey data from db
app.get('/getSurvey', dataFlowController.getSurvey ,(req, res) => {
  res.json(res.locals.surveys)
})

//get notification updates
app.get('/notifications', (req, res) => {

})


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
