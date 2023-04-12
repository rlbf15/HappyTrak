//this is the space for user model
 const mongoose = require('mongoose');
// URI
// mongodb+srv://velocirabbit:velocirabbit@cluster0.ose86oe.mongodb.net/?retryWrites=true&w=majority

  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: String
  })

  const User = mongoose.model('users', Survey);

  module.exports = User;
