//this is space for John's auth middleware
const User = require('./userModel');
const bcrypt = require('bcrypt');

const credentialsController = {};

// Create a new user and add them to the database
credentialsController.createUser = async (req, res, next) => {
    const { username, password, type } = req.body;    
    try {
        const newUser = new User({username:username, password:password, type:type})
        const savedUser = await newUser.save({username, password, type}) 
      return next()
    }catch (error) {
      return next({message: 'Error occured in credentialsController.createUser.'})
    }
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
            // sending back the user object so we can access it in the frontend
            res.locals.user = user.username;
            return next();
          })
          .catch(err => {
            return next({
              log: `Error in credentialsController.verifyUser: ${err}`,
              message: { err: 'Username or password is incorrect' },
            });
          });
      })
      .catch(err => {
        return next({
          log: `Error in credentialsController.verifyUser: ${err}`,
          message: { err: 'Username or password is incorrect' },
        });
      });
  };
  
module.exports = credentialsController;