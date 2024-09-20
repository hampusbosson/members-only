const { Router } = require('express');
const controllers = require('../controllers/controllers')
const router = Router();

router.get('/', controllers.getHomePage);
router.get('/log-in', controllers.getLoginPage)
router.get('/sign-up', controllers.getSignUpPage)

module.exports = router;