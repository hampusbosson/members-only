const query = require('../db/queries')
const bcrypt = require('bcryptjs');
const passport = require('../config/passportConfig');
const { formatDistanceToNow } = require("date-fns");
const { body, validationResult } = require("express-validator");

const getHomePage = async(req, res, next) => {
    try {
        const messages = await query.getMessages();

        const formattedMessages = messages.map((message) => {
            return {
                ...message, // Spread the original message properties
                timestamp: formatDistanceToNow(new Date(message.timestamp)) // Format the timestamp
            };
        });

        res.render('index', {
            title: 'Home',
            messages: formattedMessages,
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
            await query.insertUser(firstName, lastName, userName, hashedPassword);
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
            errorMessage: false
        });
    } catch(err) {
        return next(err);
    }
}

const joinClub = async(req, res, next) => {
    const userPasscode = req.body.passcode.toLowerCase();

    const correctAnswers = [
        'messi', 
        'lionel messi', 
        'antony', 
        'lionel andrés messi', 
        'lionel andres messi', 
        'la pulga', 
        'leo', 
        'leo messi'
    ];

    const penaldoAnswer = [
        'ronaldo',
        'cristiano ronaldo'
    ]

    try {
        if(penaldoAnswer.includes(userPasscode)) {
            return res.render('joinClub', { 
                title: 'Join club',
                errorMessage: 'Try reading the question again.' 
            })
        } 

        let correctAnswer = correctAnswers.includes(userPasscode);
        
        if(!correctAnswer) {
            return res.render('joinClub', {
                title: 'Join Club',
                errorMessage: 'Incorrect answer. Please try again.'
            });
        }

        if (!req.user) {
            return res.render('joinClub', {
                title: 'Join Club',
                errorMessage: 'You must be logged in to join the club.'
            });
        }

        await query.updateMembership(req.user.username, 'member');

        res.redirect('/');
    } catch(err) {
        return next(err);
    }
}

const addMessage = async(req, res, next) => {
    const userId = req.user.id;
    const title = req.body.title;
    const content = req.body.messageContent;

    try {
        await query.addMessage(userId, title, content);

        res.redirect('/');
    } catch(err) {
        return next(err);
    }
}

const getAdminPage = (req, res, next) => {
    try {
        res.render('admin', {
            title: 'Admin',
            errorMessage: false
        });
    } catch(err) {
        return next(err);
    }
}

const grantAdmin = async(req, res, next) => {
    const userPasscode = req.body.passcode.toLowerCase();

    const correctAnswers = [
        'candle',
        'a candle'
    ];

    try {
        let correctAnswer = correctAnswers.includes(userPasscode);
        
        if(!correctAnswer) {
            return res.render('admin', {
                title: 'Admin',
                errorMessage: 'Incorrect answer. Please try again.'
            });
        }

        if (!req.user) {
            return res.render('admin', {
                title: 'Admin',
                errorMessage: 'You must be logged in to become an admin.'
            });
        }

        await query.updateMembership(req.user.username, 'admin');

        res.redirect('/');
    } catch(err) {
        return next(err);
    }
}

const deleteMessage = async(req, res, next) => {
    const messageId = req.params.id;

    try {
        await query.deleteMessage(messageId);
        res.redirect('/'); 
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getHomePage,
    getLoginPage,
    getSignUpPage,
    signUp,
    authenticateUser,
    logOutUser,
    getJoinClubPage,
    joinClub,
    addMessage,
    getAdminPage,
    grantAdmin,
    deleteMessage
}
