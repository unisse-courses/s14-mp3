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

module.exports = mongoose.model('User', userSchema);