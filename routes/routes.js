const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    try {
        res.render('index');
    } catch(err) {
        next(err);
    }
});