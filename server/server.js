const express = require('express');
const path = require('path');
const dataFlowController = require('./dataFlowController');
const credentialsController = require('./credentialsController');
const tokenController = require('./controllers/tokenController');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const seedDatabase = require('./seedDB')
const cors = require('cors');




const dbConnect = async () =>{
  try {
    await mongoose.connect('mongodb+srv://velocirabbit:velocirabbit@cluster0.ose86oe.mongodb.net/?retryWrites=true&w=majority', {dbName: 'happytracker'})

    console.log('connected to db')
  }catch(error) {
    console.log(error)
  }
  }

  // dbConnect();


dbConnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use(express.static(path.resolve(__dirname, '../src')));

//login route
app.post('/login', credentialsController.verifyUser, (req, res) => {
  // res.locals.type looks like {type: 'employee'}
  res.status(200).json(res.locals.type);
})

//register route
app.post('/register', credentialsController.createUser, (req, res) => {
  res.status(200).json({"message": "user registered"});
})

// I used this to initialize the Token collection in the DB. Only use once. USE updateToken TO UPDATE THE TOKEN.
// app.post('/createTokens', tokenController.saveToken, (req, res) => {
//   res.status(200).json('tokens created')
// });

//delete user route
app.post('/deleteUser', credentialsController.deleteUser, (req, res) => {
  res.status(200).json({"message": "user deleted"});
});

//get all employees route
app.get('/getUsers', credentialsController.getEmployees, (req, res) => {
  // res.locals.employees looks like ["employee1", "employee2", "employee3"]
  res.status(200).json(res.locals.employees);
});

//update token route
app.post('/updateToken', tokenController.updateToken, (req, res) => {
  res.status(200).json('token updated')
});

//get token route
app.get('/getToken', tokenController.getToken, (req, res) => {
  // res.locals.token looks like {employeeToken: 'asdf', employerToken: 'asdf' }
  res.status(200).json(res.locals.token);
})

//save survery to DB
app.post('/sendSurvey', dataFlowController.saveSurvey , (req, res) => {
  res.status(200).json('data saved')
})


//get survey data from db
app.get('/getSurvey', dataFlowController.getSurvey ,(req, res) => {
  const surveyData = res.locals.surveys;
  res.status(200).send(surveyData);
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
