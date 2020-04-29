const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/foodiesdb';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};


mongoose.connect(databaseURL, options);

const ingredientSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, max: 100},
        quantity: {type: String, required: true, max: 100},
        unit: {type: String, required: true, max: 100}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
    );

module.exports = mongoose.model('Ingredient', ingredientSchema);