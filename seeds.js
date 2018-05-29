var mongoose = require("mongoose");
var Campground =require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name: "A",
        image: "https://farm3.staticflickr.com/2327/32035602144_f18b2a9aa0.jpg",
        description: "aaaaaaaa aaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
        name: "B",
        image: "https://pixabay.com/get/ed35b60f21f51c22d2524518b7444795ea76e5d004b0144392f0c47ca4ebb1_340.jpg",
        description: "aaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
        name: "C",
        image: "https://farm1.staticflickr.com/92/269272271_ce54946f2f.jpg",
        description: "aaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    ]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("removed campgrounds!")
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err,campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground")
                    //create a comment
                    Comment.create(
                        {
                            text: "this place is good!",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Create new comment");
                            }
                        });
                }
            });
        })
    });
    

}
;
module.exports = seedDB
