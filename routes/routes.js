const { Router } = require('express');
const controllers = require('../controllers/controllers')
const router = Router();

router.get('/', controllers.getHomePage);

module.exports = router;