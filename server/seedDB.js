const mongoose = require('mongoose');
const dataFlowController = require('./dataFlowController')
const Survey = require('./dataModel')

// add to server js after db is connected
  //seed databse - delete when seeding complete
  // seedDatabase(1,5); 

async function seedSurveys(surveyObj){
  const { week, q1, q2, q3, q4, q5 } = surveyObj;
  
    try {
    //create new document
    const newSurvey = new Survey({ week, q1, q2, q3, q4, q5 })
    const savedSurvey = await newSurvey.save()
    console.log("survey saved:", savedSurvey);
    // return next()
  } catch(error) {
      console.log("error in db seeding")
  }
}

const seedDatabase = (numOfSurveys, weeks) => {
  for(let i = 1; i <= numOfSurveys; i++){
    fillSurveys(weeks);
  };
}

const fillSurveys = (weeks) => {
  let surveyObj = {};
  let week;
  let q1;
  let q2;
  let q3;
  let q4;
  let q5;

  for(let i = 1; i <= weeks; i++){
    surveyObj.week = i;
    // console.log(i);
    surveyObj.q1 = generateRandomInput();
    surveyObj.q2 = generateRandomInput();
    surveyObj.q3 = generateRandomInput();
    surveyObj.q4 = generateRandomInput();
    surveyObj.q5 = generateRandomInput();
    seedSurveys(surveyObj);
    surveyObj = {};
  }
}

const generateRandomInput = () => {
  return Math.floor(Math.random() * (5-1+1) + 1);
};

module.exports = seedDatabase;
// seedDatabase(5, 1);

// call the function x amount of times for number of employees sending a survey