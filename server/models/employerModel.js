const mongoose = require('mongoose');
// can we please hide this key? Also, change the db so that the IP is protected
// pwd: sRz4P6v88wyjj68A
const MONGO_URI = 'mongodb+srv://kwolff:sRz4P6v88wyjj68A@employerdata.oelmoik.mongodb.net/?retryWrites=true&w=majority'
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

mongoose.connect(MONGO_URI, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'EmployerData'
  }
)
.then(() => console.log('Connected to Mongo DB inside the module server/models/employerModel'))
.catch(err => console.log('Error connecting to Mongo DB insde the module server/models/employerModel', err));

const employerSchema = new Schema({
  employerID: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

employerSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err,hash) => {
    if (err) return next(err)
    this.password = hash;
    return next()
  })
});



module.exports = mongoose.model('Employer', employerSchema);
