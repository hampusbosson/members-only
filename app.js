const express = require('express');
const path = require('path');
const router = require('./routes/routes');
const session = require('express-session');
const passport = require('./config/passportConfig');
require('dotenv').config();

const app = express(); 

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));