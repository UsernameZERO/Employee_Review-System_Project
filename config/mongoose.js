const mongoose = require('mongoose');
//Connecting mongoose to mongodb
// mongoose.connect(`mongodb://localhost/employee_review-systemPRz`);
const dbUrl = 'mongodb+srv://UsernameZero:UsernameZero@cluster0.oe1eg.mongodb.net/employee_review-system';
mongoose.connect( dbUrl , {useNewUrlParser: true});

const db = mongoose.connection;// storing the data from mongoDB to initialized variable

db.on('error',console.error.bind(console, "Error connecting MongoDB"));

db.once('open',function(){
    console.log(`Mongo-Db is Connected, the data can be stored now.`);
});

module.exports = db;
