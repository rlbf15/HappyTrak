//this is space for John's auth middleware
const User = require('./userModel');
const bcrypt = require('bcrypt');

const credentialsController = {};

// Create a new user and add them to the database
credentialsController.createUser = async (req, res, next) => {
    const { username, password, type } = req.body;    
    try {
        // check if username already exists
        const userExist = await User.findOne({ username });
        if (userExist) {
            return next({
                log: `Error: username already exists.`,
                message: 'Username already exists.'
            })
        }
        const newUser = new User({username:username, password:password, type:type})
        await newUser.save({username, password, type}) 
      return next()
    }catch (error) {
      return next({message: 'Error occured in credentialsController.createUser.'})
    }
}




// Verify that the user exists in the database and that the password is correct
credentialsController.verifyUser = (req, res, next) => {
    const { username, password } = req.body;
  
    // find the user in the database with the corresponding type
    User.findOne({ username })
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
            res.locals.type = {type: user.type};
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
  

// ability for employer to delete a user
credentialsController.deleteUser = async (req, res, next) => {
    const { username } = req.body;
    console.log('username', username)
    try {
        const deletedUser = await User.findOneAndDelete({ username: username });
        // if deletedUser is null, then the user does not exist in the database
        if (deletedUser === null) {
            return next({
                log: `Error: user does not exist.`,
                message: 'User does not exist.'
            });
        }
        // save the deleted user to res.locals so we can return it to the frontend if needed
        res.locals.deletedUser = deletedUser;
        return next();
    } catch (error) {
        next(error);
    }
}

// get all the users with type 'employee'
credentialsController.getEmployees = async (req, res, next) => {
    try {
        const employees = await User.find({ type: 'employee' });
        // save the employees to res.locals so we can return it to the frontend if needed
        const employeeNames = employees.map(employee => employee.username);
        res.locals.employees = employeeNames;
        return next();
    } catch (error) {
        next({message: 'Error occured in credentialsController.getEmployees.'});
    }
}

module.exports = credentialsController;