const express = require('express');
const path = require('path');
const router = require('./routes/routes');

const app = express(); 

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));