const Employer = require('../models/employerModel');
const bcrypt = require('bcryptjs');
const employerController = {};

// employer model looks like:
  // const employerSchema = new Schema({
  //   employerID: { type: String, required: true, unique: true },
  //   password: { type: String, required: true }
  // })

/// we don't have a
employerController.createEmployer = (req, res, next) => {
    if (!req.body.employerID || !req.body.password) {
        return next('No employer ID or password given')
    }
    const { employerID, password } = req.body;
    Employer.create({ employerID, password })
        .then((result) => {
            console.log('this is the result from mongo', result)
            res.locals.employer = result;
            return next();
        })
        .catch((err) => next(
            {
                log: 'Error at employerController.createEmployer An error occurred creating a username',
                message: { err }
            }
        ));
};


employerController.verifyEmployer = (req, res, next) => {
    const { employerID, password } = req.body;
    // if (!employerID || !password) return next('Missing employerID or password in userController.verifyUser');
    // return next();
    Employer.findOne({ employerID }).exec()
        .then((employerID) => {
            res.locals.hash = employerID.id;
            bcrypt.compare(password, employerID.password)
            .then(result => {
            // console.log('this is the result of bcrypt: ', result)
                if (result === true) {
                    res.locals.isVerified = {message:'verified'};
                } else {
                    res.locals.isVerified = {message: 'not_verified'};
                };
                // here we can send a message to front end like res.locals.verify = true
                // we can consider a redirect 
                return next()
            })
        })
        .catch(err => {
            return next(
                {
                    log: 'Error in employerController.verifyUser: ' + JSON.stringify(err),
                    message: { err }
                }
            )
        });
      
}


module.exports = employerController;