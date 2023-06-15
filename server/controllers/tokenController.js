//this is space for John's token middleware
const Token = require('../models/tokenModel');

const tokenController = {};

// Create a new token and add them to the database
tokenController.saveToken = async (req, res, next) => {
    const { type, token } = req.body;    
    try {
        const newToken = new Token({type:type, token:token})
        if (!newToken) {
            return next({message: 'Error occured in saving newToken.'})
        }
        await newToken.save();
        return next()

    }catch (error) {
      return next({message: 'Error occured in tokenController.updateToken.'})
    }
};

// update token in the database
tokenController.updateToken = async (req, res, next) => {
    const { type, token } = req.body;
    // {type: "employer"/"employee", token: "abc"}
    try {
      // Find the token in the database based on the type property
      const existingToken = await Token.findOne({ type });
  
      if (!existingToken) {
        // If the token does not exist, return an error
        return next({ message: 'Token not found.' });
      }
  
      // Update the existing token with the new token value
      existingToken.token = token;
      await existingToken.save();
  
      return next();
    } catch (error) {
      return next({ message: 'Error occurred in tokenController.updateToken.' });
    }
  };

// get the token from the database and save to res.locals
tokenController.getToken = async (req, res, next) => {
    try {
        const currentToken = await Token.find({ $or: [{ type: 'employee' }, { type: 'employer' }] });
        console.log('currentToken', currentToken)
        // data being stored to res.locals.token should look like {employeeToken: '123456789', employerToken: '987654321'}
        res.locals.token = {
            employeeToken: currentToken[0].token,
            employerToken: currentToken[1].token
        };
        return next()
    }catch (error) {
        return next({message: 'Error occured in tokenController.getToken.'})
    }

};

module.exports = tokenController;