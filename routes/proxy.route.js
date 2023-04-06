let express = require('express');
let router = express.Router();
let proxyController = require('../controller/proxy.controller')

router.get('/test', proxyController.test)
router.get('/ipvanish', proxyController.ipvanish)
router.get('/https', proxyController.https)
router.get('/socks4', proxyController.socks4)
router.get('/socks5', proxyController.socks5)


module.exports = router;