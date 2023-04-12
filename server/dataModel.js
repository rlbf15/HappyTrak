//This is a space for Elena's Survery model


const mongoose = require('mongoose');


const { Schema } = mongoose;

  const surveySchema = new Schema({
    week: Number,
    q1: Number,
    q2: Number,
    q3: Number,
    q4: Number,
    q5: Number
  })


  module.exports = mongoose.model('survey', surveySchema);