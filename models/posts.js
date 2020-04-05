const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/foodiesdb';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};


mongoose.connect(databaseURL, options);

const postSchema = new mongoose.Schema( // TO BE UPDATED AFTER COMMENTS
    {
        title: {type: String, required: true, max: 100},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        upvotes: {type:Number, required: true, default:0},
        dateposted: {type: String, required: true},
        timeposted: {type: String, required: true},
        recipe_picture: {type: String, required: true},
        description: {type: String, required: true, max: 250},
        ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true}],
        instructions: [{type: String, required: true}],
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true}]
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
    );

module.exports = mongoose.model('Post', postSchema);