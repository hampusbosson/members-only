const pool = require('../db/queries')
const bcrypt = require('bcryptjs');
const passport = require('../config/passportConfig');
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

async function signUp(req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.username;
    const password = req.body.password;

    try {
        bcrypt.hash(password, 10, async(err, hashedPassword) => {
            if (err) {
                return next(err);
            }
            await pool.query.insertUser(firstName, lastName, userName, hashedPassword);
        });

        res.redirect('/');
    } catch(err) {
        return next(err);
    }
}

const authenticateUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in'
});

const logOutUser = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err); 
        }
        res.redirect('/');
    });
}

const getJoinClubPage = (req, res, next) => {
    try {
        res.render('joinClub', {
            title: 'Join club',
        });
    } catch(err) {
        return next(err);
    }
}


module.exports = {
    getHomePage,
    getLoginPage,
    getSignUpPage,
    signUp,
    authenticateUser,
    logOutUser,
    getJoinClubPage
}
