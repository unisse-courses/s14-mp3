const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/foodiesdb';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};


mongoose.connect(databaseURL, options);

const userSchema = new mongoose.Schema(
    {
        email:      {type: String, required: true, unique: true, max: 100},
        firstname:  {type: String, required: true, max: 100},
        lastname:   {type: String, required: true, max: 100},
        username:   {type: String, required: true, max: 100},
        password:   {type: String, required: true, max: 100},
        profilepic: {type: String, required: false, max: 100},
        bio:        {type: String, required: false, max: 100}

    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
    );

const userModel = mongoose.model('User', userSchema);

exports.getOne = function (name, next){
    var regexInput = "^" + name;
    userModel.findOne({username: { $regex: regexInput, $options: 'i' }}, function (err, accountResult){
        next(accountResult);
    })
}

exports.getAll = function (name, next){
    var regexInput = "^" + name;
    userModel.find({username: { $regex: regexInput, $options: 'i' }}, function (err, accountResult){
        next(accountResult);
    })
}

exports.getOne = function (name, next){
    var regexInput = "^" + name;
    userModel.findOne({username: { $regex: regexInput, $options: 'i' }}, function (err, accountResult){
        next(accountResult);
    })
}
exports.editOne = function (query, update, next){
    userModel.findOneAndUpdate(query, update, { new: false }, function(err, user) {
        next(user)
    })
}

exports.findSpecific = function(user, next){
    userModel.findOne({username: user}, function(err, usernameResult){
        next(usernameResult);
    })
}

exports.deleteAccount = function(email, next){
    userModel.findOneAndRemove({email: email}, function(err){
        next();
    })
}

exports.emailCheck = function (email, next){
    var regexInput = "^" + email;

    userModel.findOne({ "email" : { $regex: email, $options: 'i' } }, function(err, emailResult) {
        next(emailResult)
    })
}

exports.usernameCheck = function(user, next){
    var regexInput = "^" + user;

    userModel.findOne({ "username" : { $regex: regexInput, $options: 'i' } }, function(err, usernameResult) {
        next(usernameResult);
    })
}

exports.newUser = function (user, next){
    const newuser = new userModel(user);

    newuser.save(function(err, new_user){
    next(err,new_user);
  });
}