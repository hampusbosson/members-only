const db = require('../db/queries')
const { body, validationResult } = require("express-validator");

const getHomePage = (req, res, next) => {
    try {
        res.render('index', {
            title: 'Home',
        });
    } catch(err) {
        next(err);
    };
};

const getLoginPage = (req, res, next) => {
    try {
        res.render('login', {
            title: 'Login'
        });
    } catch(err) {
        next(err); 
    };
};

const getSignUpPage = (req, res, next) => {
    try {
        res.render('signUp', {
            title: 'Sign up'
        });
    } catch(err) {
        next(err);
    };
};

module.exports = {
    getHomePage,
    getLoginPage,
    getSignUpPage,
}
