let controller= {}
let file = require('../utils/writeFile.js')
let request = require('../utils/getProxy.js')
const pathIpvanish= 'public/proxies/ipvanish.txt'
const axios = require('axios');
const {  apiProxyScaperHttps,
    apiProxyScaperSocks4,
    apiProxyScaperSocks5,
    apiProxyggHttps,
    apiProxyggSocks4,
    apiProxyggSocks5,
    apiProxyscanioHttps,
    apiProxyscanioSocks4,
    apiProxyscanioSocks5

} = require('../constants/api.js');


controller.test = async (req, res)=>{
	return res.status(200).json({
                        message: "success",
                    })
}

controller.ipvanish= async(req, res) =>{
	let listIpv = file.read(pathIpvanish)
	listIpv= listIpv.join("\n")
	return res.status(200).send(listIpv)
}

controller.https= async(req, res) =>{
	let total = await request.get([apiProxyscanioHttps, apiProxyScaperHttps])
	 total = (total || []).join(`\n`)
	return res.status(200).send(total)
}

controller.socks4= async(req, res) =>{

	let total = await request.get([apiProxyscanioSocks4, apiProxyScaperSocks4])
	 total = (total || []).join(`\n`)
	return res.status(200).send(total)
}


controller.socks5= async(req, res) =>{

	let total = await request.get([apiProxyscanioSocks5, apiProxyScaperSocks5])
	 total = (total || []).join(`\n`)
	return res.status(200).send(total)
}


module.exports = controller