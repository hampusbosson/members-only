const db = require('../db/queries')
const { body, validationResult } = require("express-validator");
const { get } = require("../routes/routes");

const pageTitle = 'MembersOnly';

const getHomePage = (req, res, next) => {
    try {
        res.render('index', {
            title: pageTitle,
        });
    } catch(err) {
        next(err);
    };
};

module.exports = {
    getHomePage,
}
