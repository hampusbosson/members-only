const { body } = require("express-validator");
const query = require('../db/queries'); 

const validateSignUp = [
    body('firstName')
        .notEmpty().withMessage('First name is required.')
        .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long.'),
    
    body('lastName')
        .notEmpty().withMessage('Last name is required.')
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long.'),
    
    body('username')
        .notEmpty().withMessage('Username is required.')
        .isLength({ min: 4, max: 20 }).withMessage('Username must be between 4 and 20 characters long.')
        .custom(async (username) => {
            const existingUser = await query.getUserByUsername(username); 
            if (existingUser) {
                throw new Error('Username is already taken.');
            }
        }),
    
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
        .matches(/[0-9]/).withMessage('Password must contain at least one number.')
        .matches(/[\W_]/).withMessage('Password must contain at least one special character.'),

    // Custom validation to ensure confirmPassword matches password
    body('confirmPassword')
        .notEmpty().withMessage('Confirm password is required.')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match.');
            }
            return true;
        })
];

module.exports = { validateSignUp };

