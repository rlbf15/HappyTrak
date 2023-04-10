const db = require('./dataModel.js');

const baseError = {
  status: 400,
  message: { err: 'An error occurred' },
};

const employeeController = {};

//Post request param names coming from the front end:
// week: 1,
// employee_id: 0,
// question_0: 1,
// question_1: 1,
// question_2: 1,
// question_3: 1

employeeController.createResponse = async (req, res, next) => {
  const { week, employee_id, question_0, question_1, question_2, question_3 } =
    req.body;
  reqArray = [
    week,
    employee_id,
    question_0,
    question_1,
    question_2,
    question_3,
  ];
  const insertResponse =
    'INSERT INTO survey(week, employee_id, question_0, question_1, question_2, question_3) VALUES ($1, $2, $3, $4, $5, $6);';
  try {
    await db.query(insertResponse, reqArray);
    next();
  } catch (err) {
    baseError.log = `Error caught in createResponse middleware: ${err}`;
    baseError.message.err = 'Could not store survey result.';
    next(baseError);
  }
};

employeeController.getGraph = async (req, res, next) => {
  const selectQuery = `SELECT week AS week_id,
  CAST(SUM(question_0) as INT) as question_0_total,
  CAST(SUM(question_1) as INT) as question_1_total,
  CAST(SUM(question_2) as INT) as question_2_total,
  CAST(SUM(question_3) as INT) as question_3_total
  FROM survey GROUP BY week ORDER BY week ASC`; // must explicitly order
  try {
    const result = await db.query(selectQuery);
    console.log('result.rows: ', result.rows);
    res.locals.graph = result.rows;
    next();
  } catch (err) {
    baseError.log = `Error caught in getGraph: ${err}`;
    baseError.message.err = `Could not retrieve data`;
    return next(baseError);
  }
};

module.exports = employeeController;
