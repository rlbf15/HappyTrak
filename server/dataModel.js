//This is a space for Elena's Survery model
// URI
// mongodb+srv://velocirabbit:velocirabbit@cluster0.ose86oe.mongodb.net/?retryWrites=true&w=majority

const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://velocirabbit:velocirabbit@cluster0.ose86oe.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'db'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

  const Schema = mongoose.Schema;

  const surveySchema = new Schema({
    week: { type: Number, required: true },
    q1: { type: Number, required: true },
    q2: { type: Number, required: true },
    q3: { type: Number, required: true },
    q4: { type: Number, required: true },
    q5: { type: Number, required: true }
  })

  const Survey = mongoose.model('surveys', surveySchema);

  module.exports = Survey;