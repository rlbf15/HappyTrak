//this is the space for user model
 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');
// URI
// mongodb+srv://velocirabbit:velocirabbit@cluster0.ose86oe.mongodb.net/?retryWrites=true&w=majority

const Salt_Work_Factor = 10;

  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: String
  })

  // hashing a password before saving it to the database
userSchema.pre('save', function(next) {
  //generate a salt
  bcrypt.genSalt(Salt_Work_Factor, (err, salt) => {
    if (err) {
      return next({
          log: `Error in bcrypt.genSalt: ${err}`,
          message: { err: 'Error occured in bcrypt.genSalt'}
      });
    }
    // hash the password using our new salt
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next({
          log: `Error in bcrypt.hash: ${err}`,
          message: { err: 'Error occured in bcrypt.hash'}
        });
      }
      // override the original password with the hashed one
      this.password = hash;
      next();
    });
  });
});

  const User = mongoose.model('users', userSchema);

  module.exports = User;
