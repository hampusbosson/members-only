const express = require("express");
const path = require("path");
const router = require("./routes/routes");
const session = require("express-session");
const passport = require("./config/passportConfig");
const db = require('./db/pool');
const pgSession = require('connect-pg-simple')(session);
const expressLayouts = require('express-ejs-layouts');
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(expressLayouts);

// Specify the layout file
app.set('layout', 'layouts/layout');

app.use(
  session({
    store: new pgSession({
        pool: db.pool
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, // 1 day expiration
        secure: process.env.NODE_ENV === 'production',  // Only secure in production
        httpOnly: true,  // Prevent access via JavaScript
        sameSite: 'lax',  // Protect against CSRF
    }
  }),
);

app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
