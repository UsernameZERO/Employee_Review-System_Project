const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required:true,
    },
    fdbkBYuser: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userPerformance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Performance',
    }

},{
    timestamps: true,
});

// creating a model for feedbacks
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;