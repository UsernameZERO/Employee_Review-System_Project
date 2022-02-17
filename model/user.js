const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    usersPower: {
        type: String,
        enum: ["admin", "employee"],
        required: true,
    },
    department:{
        type:String,
        enum: ["HR", "Accounting", "Production","Marketing"],
        required:true
      },
    empReviews:  [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Performance',
    },
    ],
},{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;