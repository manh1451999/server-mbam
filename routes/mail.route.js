let express = require('express');
let router = express.Router();
let mailController = require('../controller/mail.controller')

const validateRequest = require('../middleware/validateRequest.middleware');
const mailSchemas = require('../validation/Mail');


router.get('/test', mailController.test)
router.post('/readMailBox', validateRequest(mailSchemas.readMailBox, 'body'), mailController.readMailBox)
router.post('/checkLive', validateRequest(mailSchemas.checkLive, 'body'), mailController.checkLive)



module.exports = router;