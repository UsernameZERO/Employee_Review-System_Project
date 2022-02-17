const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
    review: {
        type: Number,
        min:[1,"Lower performance "],
        max:[5,"Higher performance"],
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    rvwBYuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    rvwFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    feedbacks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Feedback",
        },
      ],

},{
    timestamps: true,
});

//Adding a performance model
const Performance = mongoose.model('Performance', performanceSchema);

module.exports = Performance;