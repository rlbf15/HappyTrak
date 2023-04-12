//this is space for John's auth middleware
const User = require('../server/userModel.js');

const credentialsController = {};

// Create a new user and add them to the database
credentialsController.createUser = (req, res, next) => {
    const { username, password, type } = req.body;

    User.createUser(username, password, type, (err, user) => {
        if (err) {
            return next({
                log: `Error in credentialsController.createUser: ${err}`,
                message: { err: 'Error occured in credentialsController.createUser.'},
            });
        }
        res.locals.user = user; // storing the user in res.locals just incase we need it later
        return next();
    });
}

// Verify that the user exists in the database and that the password is correct
credentialsController.verifyUser = (req, res, next) => {
    const { username, password, type } = req.body;
  
    // find the user in the database with the corresponding type
    User.findOne({ username, type })
      .then(user => {
        if (!user) {
          // If the user doesn't exist, save res.locals.isAuthenticated as false
          res.locals.isAuthenticated = false;
          return next({
            log: `Error in credentialsController.verifyUser: ${err}`,
            message: { err: 'Username or password is incorrect' }, // Don't want to specify which one is incorrect for security reasons
          });
        }
  
        // Compare the plain-text password entered by the user to the hashed password stored in the database
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              // If the user doesn't exist, save res.locals.isAuthenticated as false
              res.locals.isAuthenticated = false;
              return next({
                log: `Error in credentialsController.verifyUser: ${err}`,
                message: { err: 'Username or password is incorrect' }, // Don't want to specify which one is incorrect for security reasons
              });
            }
  
            // If the user's credentials are valid, store their information in the request object and call the next middleware
            res.locals.isAuthenticated = true;
            return next();
          })
          .catch(err => {
            return next({
              log: `Error in credentialsController.verifyUser: ${err}`,
              message: { err: 'Error with bcrypt Compare' },
            });
          });
      })
      .catch(err => {
        return next({
          log: `Error in credentialsController.verifyUser: ${err}`,
          message: { err: 'Error with User.findOne' },
        });
      });
  };
  
