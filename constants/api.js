const apiProxyScaperHttps = "https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all"
const apiProxyScaperSocks4 = "https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks4&timeout=10000&country=all&ssl=all&anonymity=all"
const apiProxyScaperSocks5 = "https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks5&timeout=10000&country=all&ssl=all&anonymity=all"

const apiProxyscanioHttps= "https://www.proxyscan.io/download?type=https"
const apiProxyscanioSocks4= "https://www.proxyscan.io/download?type=socks4"
const apiProxyscanioSocks5= "https://www.proxyscan.io/download?type=socks5"

const apiProxyggHttps= "https://api.proxies.gg/v1/request?action=getproxies&timeout=10000&level=all&ssl=all&country=all&proxytype=91c36df2-7187-49c0-8fb2-5e21bcd9ca86"
const apiProxyggSocks4= "https://api.proxies.gg/v1/request?action=getproxies&timeout=10000&country=all&proxytype=85084f9c-a283-4f64-bfde-980dac063455"
const apiProxyggSocks5= "https://api.proxies.gg/v1/request?action=getproxies&timeout=10000&country=all&proxytype=6a1ada92-5213-4de1-9d1d-4a4e1fffb226"

const sliverProxyHttps= "https://www.secproxy.org/getProxies?key=premium_6f3540e748b9f80dcc4ede9ffd0f7b00&type=https"
const sliverProxySocks4= "https://www.secproxy.org/getProxies?key=premium_6f3540e748b9f80dcc4ede9ffd0f7b00&type=socks4"
const sliverProxySocks5= "https://www.secproxy.org/getProxies?key=premium_6f3540e748b9f80dcc4ede9ffd0f7b00&type=socks5"

module.exports = {
    apiProxyScaperHttps,
    apiProxyScaperSocks4,
    apiProxyScaperSocks5,
    apiProxyggHttps,
    apiProxyggSocks4,
    apiProxyggSocks5,
    sliverProxyHttps,
    sliverProxySocks4,
    sliverProxySocks5,
    apiProxyscanioHttps,
    apiProxyscanioSocks4,
    apiProxyscanioSocks5
}