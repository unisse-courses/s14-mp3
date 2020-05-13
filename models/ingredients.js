const mongoose = require('mongoose');
const { dbURL } = require('../config');

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};


mongoose.connect(dbURL, options);

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