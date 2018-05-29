//all the middleware gose here
var Campground =require("../models/campground");
var Comment =require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
      if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampgrpund){
            if(err || !foundCampgrpund){
                req.flash("error","campground not found");
                res.redirect("back");
            } else {
                //dose ier own the campground
                if(foundCampgrpund.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error","you don't have permession to do that");
                    res.redirect("back");
                }
            }
        });        
    } else {
        req.flash("error", "You need to login to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
      if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                //dose user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error","you don't have permession to do that");
                    res.redirect("back");
                }
            }
        });        
    } else {
        req.flash("error","You need to be logged in to do that");
        res.redirect("back")
    }
}


middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login")
}

module.exports = middlewareObj
