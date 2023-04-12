//this is the middleware to handle DB survey requests
const Survey = require('./dataModel')
const mongoose = require('mongoose')

const dataFlowController = {
 getSurvey: async (req, res, next) => {

  try{
    const surveys = await Survey.find()
    res.locals.surveys = surveys
    return next()
  } catch (error) {
    return next({log: 'There was an error in getSurvey middleware'})
  }
 },

 saveSurvey: async (req, res, next) => {
  const { week, q1, q2, q3, q4, q5 } = req.body;


  try {
    //create new document
    const newSurvey = new Survey({ week, q1, q2, q3, q4, q5 })
    const savedSurvey = await newSurvey.save()

    return next()
  } catch(error) {
      return next({
        err: error
      })
  }
}
}
module.exports = dataFlowController;