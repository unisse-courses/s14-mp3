//import module 'check' from 'express-validator'
const { check } = require('express-validator');

/*
    this defines an object which contains functions
    which returns array of validation middlewares
*/
const validation = {

    signupValidation: function() {

        /*
            object `validation` is an array of validation middlewares.
            the first parameter in method check() is the field to check
            the second parameter in method check() is the error message
            to be displayed when the value to the parameter fails
            the validation
        */
       var validate = [
           
            //check if EMAIL is not empty
            check('EMAIL', 'Email is required.').notEmpty(),

            //same thing with the firstname, lastname, etc.
            check('FIRSTNAME', 'First name is required.').notEmpty(),
            check('LASTNAME', 'Last name is required.').notEmpty(),
            check('USERNAME', 'Username is required; must be greater than 6 and less than 15 characters.').isLength({min: 6, max: 15}),
            check('PASSWORD', 'Password must be greater than 6 characters.').isLength({min: 6})
       ];

       return validate;
    }
}

/*
    exports the object 'validation' when another script exports from this file
*/
module.exports = validation;