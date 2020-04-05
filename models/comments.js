const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/foodiesdb';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};


mongoose.connect(databaseURL, options);

const commentSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        content: {type: String, required: true, max: 100},
        date: {type: String, required: true},
        time: {type: String, required: true},
        replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true}]

    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
    );

module.exports = mongoose.model('Comment', commentSchema);