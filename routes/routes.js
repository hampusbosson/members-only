const { Router } = require('express');
const controllers = require('../controllers/controllers');
const { validateSignUp } = require('../validations/authValidation');
const router = Router();

router.get('/', controllers.getHomePage);
router.post('/', controllers.addMessage);
router.get('/log-in', controllers.getLoginPage);
router.post('/log-in', controllers.authenticateUser);
router.get('/sign-up', controllers.getSignUpPage);
router.post('/sign-up', validateSignUp, controllers.signUp);
router.get('/log-out', controllers.logOutUser);
router.get('/join-club', controllers.getJoinClubPage);
router.post('/join-club', controllers.joinClub);
router.get('/admin', controllers.getAdminPage);
router.post('/admin', controllers.grantAdmin);
router.post('/delete-msg/:id', controllers.deleteMessage)

module.exports = router;