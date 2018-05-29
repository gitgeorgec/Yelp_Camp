var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware")

//index show all campgrounds
router.get("/", function(req, res){
    //get all campground from DB 
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allcampgrounds});
        }
    });
});

//create - add new campground to db
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description =req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price:price, image:image, description:description, author: author};
    //create a new campgound and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

//new - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//show = shows more info about one campground
router.get("/:id", function(req, res){
    //find  thiw canpground with the id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampgrpund){
        if(err || !foundCampgrpund){
            console.log(err);
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampgrpund});
        }
    });
});

//Edit campground Routes
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampgrpund){
            res.render("campgrounds/edit", {campground: foundCampgrpund});
        });
});
//update campground Routes
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
                //redirect somewhere(show page)
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destory campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


//middleware

module.exports = router;