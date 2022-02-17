const Performance = require('../model/performace');
const User = require('../model/user');
const Feedback = require('../model/feedback');

//creating performance
module.exports.create = async function(req, res){

    // console.log("present profile user :-->", res.locals.user.name);
    // console.log("present user ", req.body);

    try {
        if (req.body.rvwBYuser == res.locals.user.id) {
            const user = await User.findById(req.body.rvwfor)
            if (user) {
                const performance = await Performance.create({
                    review: req.body.review,
                    description: req.body.description,
                    rvwBYuser: req.body.rvwBYuser,
                    rvwFor : req.body.rvwfor,
                });
                user.empReviews.push(performance);
                user.save();

                return res.redirect('back');
            }else{
                console.log("you are not an user");
                return res.redirect('back');
            }
        }
        
    } catch (error) {
        if (error) {
            console.log("error in creating the performace-->", error);
        }
        return res.redirect('back');
    }
   
}

// module.exports.createPerf = function(req,res){
//     console.log("creperf%%", req.body);
//     console.log("creperf%%", res.locals.user);
//     console.log("creperfascdcd%", req.user._id);
//     // Performance.findById(req.user)
//     return res.redirect('back');
// }

//Deleting the performance And associated feedbacks nad from users
module.exports.destroy = async function(req,res){
    
    try {
        const  performance = await Performance.findById(req.params.id);
        // console.log("check perf ----", performance.id);
        // console.log("performance desc = ",performance.description);
        // console.log("performance user id = ",performance.rvwFor._id.toString());
        if(req.user.usersPower === 'admin'){
            performance.remove();
            let feedback = await Feedback.deleteMany({performance: req.params.id});
            let user = await User.findByIdAndUpdate(performance.rvwFor,{$pull: {empReviews: performance.id }});

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    } catch (error) {
      console.log(error);
      return res.redirect('back');
    }
   
}

//updating the performance
module.exports.updatePerf = async function(req,res){
    if (req.user.usersPower === 'admin') {
        let performance = await Performance.findByIdAndUpdate(req.params.id, req.body)
        return res.redirect('back');
    } else {
        res.redirect('back');
    }
}