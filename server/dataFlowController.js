//this is the middleware to handle DB survey requests


const dataFlowController = {
 getSurvey: (req, res, next) => {

 },

 saveSurvey: async (req, res, next) => {
  const { q1, q2, q3, q4, q5 } = req.body;
  try {
    //create new document
    const newSurvey = new Survey({ q1, q2, q3, q4, q5 })
    const savedSurvey = await newSurvey.save();
    return next()
  } catch(error) {
      return next({
        log: 'Something bad happened in saveSurvey middleware',
        err: err
      })
  }
}
}
module.exports = dataFlowController;