let controller = {}
let file = require('../utils/writeFile.js')
let request = require('../utils/getProxy.js')
const { getCache, setCache } = require('../utils/cache.js')
const pathIpvanish = 'public/proxies/ipvanish.txt'

let FULL_LINK = {
	JUPROXY: {
		'https': ["https://www.juproxy.com/api?token=yXYKJmzslnxffEoGS2fJhLs6jCw5Zf1WXhcdQi4p&type=https"],
		'http': ["https://www.juproxy.com/api?token=yXYKJmzslnxffEoGS2fJhLs6jCw5Zf1WXhcdQi4p&type=http"],
		'socks4': ["https://www.juproxy.com/api?token=yXYKJmzslnxffEoGS2fJhLs6jCw5Zf1WXhcdQi4p&type=socks4"],
		'socks5': ["https://www.juproxy.com/api?token=yXYKJmzslnxffEoGS2fJhLs6jCw5Zf1WXhcdQi4p&type=socks5"],
	},

	PROXY_SCAPPER: {
		'http': ["https://api.proxyscrape.com/v2/?request=getproxies&timeout=10000&country=all&ssl=all&anonymity=all&protocol=http"],
		'https': ["https://api.proxyscrape.com/v2/?request=getproxies&timeout=10000&country=all&ssl=all&anonymity=all&protocol=https"],
		'socks4': ["https://api.proxyscrape.com/v2/?request=getproxies&timeout=10000&country=all&ssl=all&anonymity=all&protocol=socks4"],
		'socks5': ["https://api.proxyscrape.com/v2/?request=getproxies&timeout=10000&country=all&ssl=all&anonymity=all&protocol=socks5"],
	},
	TELEGRAM: {
		'http': ["http://client234.xdlcloud.ir/Join-Telegram%3E@TeamDemon.php"],
	},
	MANU_GMG: {
		'socks5': ["https://raw.githubusercontent.com/manuGMG/proxy-365/main/SOCKS5.txt"],
	},
	HOOKZOF: {
		'socks5': ["https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt"],
	},
	MMPX12 : {
		'http': ["https://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt"],
		'https': ["https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt"],
		'socks4': ["https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks4.txt"],
		'socks5': ["https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks5.txt"],
	},
	ROOSTERKID_OPENPROXYLIST: {
		'https': ["https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS.txt"],
		'socks5': ["https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS5_RAW.txt"],
		'socks4': ["https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS4_RAW.txt"],
	},
	SHIFTY: {
		'http': ["https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt"],
		'https': ["https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt"],
		'socks4': ["https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks4.txt"],
		'socks5': ["https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks5.txt"],
	},
	THE_SPEEDX: {
		'http': ["https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt"],
		'socks4': ["https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks4.txt"],
		'socks5': ["https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks5.txt"],
	},
	OPENPROXYLIST_XYZ: {
		'http': ["https://openproxylist.xyz/http.txt"],
		'socks4': ["https://openproxylist.xyz/socks4.txt"],
		'socks5': ["https://openproxylist.xyz/socks5.txt"],
	}
}

// FULL_LINK.CUSTOM = {
// 	'http': ["CUSTOMER"],
// 	'socks4': ["CUSTOMER"],
// 	'socks5': ["CUSTOMER"],
// }

const getProxy = async (category, type, useCache= true) =>{
	categoryFormated = category?.toString()?.toUpperCase()
	const key = `${categoryFormated}---${type}`
	let proxies = getCache(key)
	if(proxies && useCache) {
		// console.log(`Cache ===> get ${proxies.split('\n').length} from ${key}`)
		return proxies
	}
	const links = FULL_LINK?.[categoryFormated]?.[type]
	if (!links) throw Error("không có link phù hợp");
 	proxies = await request.get(links)
	// console.log(`get ${proxies.length} from  ${key}`)
	proxies = (proxies || []).join(`\n`)
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
	return res.status(200).send(proxies)
}

controller.custom = async (req, res) => {
	let { type, category } = req.query
	const proxies = await getProxy(category, type)
	return res.status(200).send(proxies)
}

controller.getlink = async (req, res) => {
	return res.status(200).send(FULL_LINK)
}

module.exports = controller