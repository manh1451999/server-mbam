let controller = {}
let file = require('../utils/writeFile.js')
let request = require('../utils/getProxy.js')
const { getCache, setCache } = require('../utils/cache.js')
const { FULL_LINK } = require('../constants/proxy.js')
const pathIpvanish = 'public/proxies/ipvanish.txt'


// FULL_LINK.CUSTOM = {
// 	'http': ["CUSTOMER"],
// 	'socks4': ["CUSTOMER"],
// 	'socks5': ["CUSTOMER"],
// }

const getProxy = async (category, type, useCache= true) =>{
	categoryFormated = category?.toString()?.toUpperCase()
	const key = `${categoryFormated}---${type}`
	let proxiesCache = getCache(key)
	const links = FULL_LINK?.[categoryFormated]?.[type]
	if (!links) throw Error("không có link phù hợp");
 	proxies = await request.get(links)
	// console.log(`get ${proxies.length} from  ${key}`)
	if(proxiesCache && useCache && (proxies.length == 0)) {
		// console.log(`Cache ===> get ${proxies.split('\n').length} from ${key}`)
		return proxiesCache
	}
	proxies = proxies || []
	setCache(key, proxies)
	return proxies
}

controller.getProxy = getProxy

controller.test = async (req, res) => {
	return res.status(200).json({
		message: "success",
	})
}


controller.ipvanish = async (req, res) => {
	let listIpv = file.read(pathIpvanish)
	listIpv = listIpv.join("\n")
	return res.status(200).send(listIpv)
}

controller.juproxy = async (req, res) => {
	const { type } = req.query
	const proxies = await getProxy('JUPROXY', type)
	return res.status(200).send(proxies.join(`\n`))
}

controller.custom = async (req, res) => {
	let { type, category } = req.query
	const proxies = await getProxy(category, type)
	return res.status(200).send(proxies.join(`\n`))
}

controller.getlink = async (req, res) => {
	return res.status(200).send(FULL_LINK)
}

module.exports = controller