// TODO: Mongoose Code AFTER doing all the AJAX per page

/*
    code we can use as a basis (authors.js file in ms. unisse's github foler "node-mongoose-reference"):

    const mongoose = require('mongoose');
    const databaseURL = 'mongodb://localhost:27017/librarydb';

    const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

    mongoose.connect(databaseURL, options);

    const AuthorSchema = new mongoose.Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
    );

    AuthorSchema.virtual('full_name')
    .get(function() {
        return this.family_name + ', ' + this.first_name;
    })
    .set(function(value) {
        var splitName = value.split(', ');

        this.family_name = splitName[0]
        this.first_name = splitName[1]
    });


    module.exports = mongoose.model('Author', AuthorSchema);
    
*/

const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/foodiesdb';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};


mongoose.connect(databaseURL, options);

const userSchema = new mongoose.Schema(
    {
        firstname:  {type: String, required: true, max: 100},
        lastname:   {type: String, required: true, max: 100},
        username:   {type: String, required: true, max: 100},
        password:   {type: String, required: true, max: 100},
        bio:        {type: String, required: false, max: 100},

    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
    );

module.exports = mongoose.model('user', userSchema);