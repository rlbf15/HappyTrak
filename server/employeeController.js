const db = require('./dataModel.js');

const employeeController = {};

//Post request param names coming from the front end: 
    //   week: 1,
    //   employee_id: 0,
    //   question_0: 1,
    //   question_1: 1,
    //   question_2: 1

employeeController.createResponse = (req, res, next) => {
  const { variables } = req.body;
  reqArray = [variables]
  const insertResponse = 'INSERT INTO survey(week, employee_id, question_0, question_1, question_2) VALUES ($1, $2, $3, $4, $5);'
}

module.exports = employeeController;
