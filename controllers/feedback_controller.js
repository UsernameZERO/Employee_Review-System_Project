const Feedback = require('../model/feedback');
const Performance = require('../model/performace');


//Creating the feedback storing it in performance
module.exports.create = function(req, res){
Performance.findById(req.body.userPerformance, function(err, performance){
    if(performance){
        Feedback.create({
            feedback: req.body.feedback,
            fdbkBYuser: req.body.fdbkBYuser,
            userPerformance: req.body.userPerformance,
        }, function(err, feedback){
            if (err) {
                console.log("err in creating the feedback", err);
            }
            performance.feedbacks.push(feedback);
            performance.save();
            return res.redirect('back');

        });
    }
});

}

//Deleting the feedbacks and that are associatied with performance
module.exports.destroy = async function(req, res){
    try {
        if(req.user.usersPower === 'admin'){
            const feedback = await Feedback.findById(req.params.id);
            feedback.remove();
            // console.log("fid", feedback.id);
            // console.log("fid1", req.params.id);
            // console.log("fidUser-->", feedback.userPerformance);
            // console.log("fidUser-->", feedback.userPerformance.toString());
            let performance = await Performance.findByIdAndUpdate(feedback.userPerformance.toString(),{$pull: {feedbacks: feedback.id}});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

// updating the feedback
module.exports.updateFeed =  async function(req,res){
    if( req.user.usersPower === 'admin'){
        // console.log("update feed",req.params.id);
        let feedback = await Feedback.findByIdAndUpdate(req.params.id,req.body);
        // console.log(req.body);
        // console.log("feedb;;;",feedback.feedback);
        return res.redirect('back');
    }else{
        console.log("you are not an admin to update feed");
        return res.redirect('back');
    }

 }