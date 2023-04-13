const db = require('../models/dataModel.js');


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

employeeController.getEmployees = (req, res, next) => {
  // res.locals.employees = testData; 
  return next(); 
}


employeeController.createResponse = async (req, res, next) => {
  const { week, employee_id, question_0, question_1, question_2, question_3 } =
    req.body;
  const reqArray = [
    week,
    employee_id,
    question_0,
    question_1,
    question_2,
    question_3,
  ];
  const findArray = [week, employee_id];
  const insertResponse =
    'INSERT INTO survey(week, employee_id, question_0, question_1, question_2, question_3) VALUES ($1, $2, $3, $4, $5, $6);';
  const findResponse = `SELECT * FROM survey WHERE week=($1) AND employee_id=($2);`;
  try {
    //check if employee_id and week already exist
    const findResult = await db.query(findResponse, findArray);
    if (findResult.rows.length > 0) {  // fixed line 
      console.log(findResult.row)
      console.log('Submission already exists');
      next();
    } else {
      const recordSubmit = await db.query(insertResponse, reqArray);
      console.log('New submission added!');
      next();
    }
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
    // console.log('result.rows: ', result.rows);
    res.locals.graph = result.rows;
    next();
  } catch (err) {
    baseError.log = `Error caught in getGraph: ${err}`;
    baseError.message.err = `Could not retrieve data`;
    return next(baseError);
  }
};

employeeController.resetTable = async (req, res, next) => {
  const reset = `BEGIN;
  TRUNCATE TABLE survey RESTART IDENTITY;
  COMMIT;`;
  try {
    await db.query(reset);
    next();
  } catch (err) {
    baseError.log = `Error in employeeController.resetTable: ${err}`;
    baseError.message.err = 'Could not reset the database table.';
    next(baseError);
  }
};

employeeController.resetAndPopulateData = async (req, res, next) => {
  const reset = `BEGIN;
  TRUNCATE TABLE survey RESTART IDENTITY;
  INSERT INTO 
    survey (week, employee_id, question_0, question_1, question_2, question_3)
  VALUES
    (1, 1, 5, 4, 5, 5),
    (2, 1, 4, 4, 5, 4),
    (3, 1, 3, 4, 4, 4),
    (4, 1, 3, 4, 4, 3),
    (1, 2, 4, 5, 5, 4),
    (2, 2, 4, 4, 4, 4),
    (3, 2, 3, 4, 4, 4),
    (4, 2, 3, 3, 3, 4),
    (1, 3, 5, 3, 4, 3),
    (2, 3, 3, 3, 4, 3),
    (3, 3, 3, 3, 4, 3),
    (4, 3, 3, 2, 4, 3),
    (1, 4, 5, 5, 4, 4),
    (2, 4, 4, 5, 4, 4),
    (3, 4, 4, 5, 4, 3),
    (4, 4, 3, 5, 4, 3);
  COMMIT;`;
  try {
    await db.query(reset);
    next();
  } catch (err) {
    baseError.log = `Error in employeeController.resetAndPopulateData: ${err}`;
    baseError.message.err = 'Could not reset and repopulate database.';
    next(baseError);
  }
};

module.exports = employeeController;
