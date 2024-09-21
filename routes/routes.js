const { Router } = require('express');
const controllers = require('../controllers/controllers')
const router = Router();

router.get('/', controllers.getHomePage);
router.get('/log-in', controllers.getLoginPage)
router.post('/log-in', controllers.authenticateUser)
router.get('/sign-up', controllers.getSignUpPage)
router.post('/sign-up', controllers.signUp)
router.get('/log-out', controllers.logOutUser);
router.get('/join-club', controllers.getJoinClubPage);
router.post('/join-club', controllers.joinClub)

module.exports = router;