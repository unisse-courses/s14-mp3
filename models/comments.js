const mongoose = require('mongoose');
const { dbURL } = require('../config');

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};


mongoose.connect(dbURL, options);

const commentSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        content: {type: String, required: true, max: 100},
        date: {type: String, required: true},
        time: {type: String, required: true},
        replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false}],
        _id:    {type: Number, required: true},
        recipe_id: {type: Number, required: true}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
    );

module.exports = mongoose.model('Comment', commentSchema);