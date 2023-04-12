//this is the middleware to handle DB survey requests
const Survey = require('./dataModel')
const mongoose = require('mongoose')

const dataFlowController = {
 getSurvey: async (req, res, next) => {
    // //get survey from db
    // const surveys = await Survey.find()
    // //does survey come back as an array of object
    // res.locals.surveys = [ surveys ]
 },

 saveSurvey: async (req, res, next) => {
  const { q1, q2, q3, q4, q5 } = req.body;


  try {
    //create new document
    const newSurvey = new Survey({ q1, q2, q3, q4, q5 })

    const savedSurvey = await newSurvey.save()
    console.log(savedSurvey)
    return next()
  } catch(error) {
      return next({

        err: error
      })
  }
}
}
module.exports = dataFlowController;