const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/foodiesdb';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};


mongoose.connect(databaseURL, options);

const postSchema = new mongoose.Schema( // TO BE UPDATED AFTER COMMENTS
    {   _id: {type: Number, required: true},
        title: {type: String, required: true, max: 100},
        user: {type: mongoose.Schema.Types.Mixed, required: true},
        upvotes: {type:Number, required: true, default:0},
        dateposted: {type: String, required: true},
        timeposted: {type: String, required: true},
        recipe_picture: {type: String, required: true},
        description: {type: String, required: true, max: 250},
        ingredients: [{type: mongoose.Schema.Types.Mixed, required: true}],
        instructions: [{type: String, required: true}],
        comments: [{type: mongoose.Schema.Types.Mixed, ref: 'Comment', required: false}]
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
    );

const postModel = mongoose.model('Post', postSchema);

exports.topFive = function(next){
    postModel.find().lean().limit(5).sort({upvotes: -1, title: 1}).exec(function(err, data){
        //res.send(data);

        next(data);
      }) 
}

exports.getOne = function(id, next){
    postModel.findOne({_id: id}).lean().exec(function(err, data){
        next(data)
    })
}

exports.ownPosts = function(email, next){
    postModel.find({"user.email" : email}).lean().exec(function (err, data){
        next(data)
    })
}

exports.updateAllPosts = function(first, last, user, pass, bio, pic){
    postModel.updateMany({ $set: {
        "user.firstname": first,
        "user.lastname": last,
        "user.username": user,
        "user.password": pass,
        "user.bio": bio,
        "user.profilepic ": pic
      } },
      
      function(err, result) {
        if (err) throw err;
        
      }
      
    );
}

exports.updateOnePost = function (query, update, next){
    postModel.findOneAndUpdate(query, update, {new: false}, function (err,new_post){
        next(new_post)
    })
}

exports.removePost = function(id, next){
    postModel.findPostAndRemove({_id: id}).exec(function(err){
        next();
    })
}

exports.addComments = function(id, commentsList, next){
    postModel.findByIdAndUpdate(id, 
        {$push: {
          comments: commentsList
        }} , 
        function(err, stuff){
            if (err) throw err;
            next(stuff);
        })
}

exports.findByTitle = function(title, next){
    var searchPattern = "^" + title;
  postModel.find({title: {$regex: searchPattern, $options: 'i'}}).lean().exec( function(err, searchResults){
    next(searchResults);
  })
}
