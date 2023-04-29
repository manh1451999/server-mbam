let express = require('express');
let router = express.Router();
let proxyController = require('../controller/proxy.controller')

router.get('/test', proxyController.test)
router.get('/ipvanish', proxyController.ipvanish)
router.get('/juproxy', proxyController.juproxy)
router.get('/custom', proxyController.custom)


module.exports = router;