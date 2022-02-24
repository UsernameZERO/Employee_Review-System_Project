const mongoose = require('mongoose');
//Connecting mongoose to mongodb
mongoose.connect(`mongodb://localhost/employee_review-sys1`);

const db = mongoose.connection;// storing the data from mongoDB to initialized variable

db.on('error',console.error.bind(console, "Error connecting MongoDB"));

db.once('open',function(){
    console.log(`Mongo-Db is Connected, the data can be stored now.`);
});

module.exports = db;
