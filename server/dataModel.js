//This is a space for Elena's Survery model


const mongoose = require('mongoose');


const { Schema } = mongoose;

  const surveySchema = new Schema({
    week: { type: Number, required: true },
    q1: { type: Number, required: true },
    q2: { type: Number, required: true },
    q3: { type: Number, required: true },
    q4: { type: Number, required: true },
    q5: { type: Number, required: true },
  })


  module.exports = mongoose.model('survey', surveySchema);