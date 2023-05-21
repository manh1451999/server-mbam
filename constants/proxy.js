var FULL_LINK = {
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
    MMPX12: {
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

const mergeLink = (type, listSite = []) => {
    return listSite.map(site => FULL_LINK?.[site]?.[type]).filter(Boolean).flat()
}

// FULL_LINK.AUTO_CHECK = {
//     'http': mergeLink('http', ['PROXY_SCAPPER', 'TELEGRAM', 'MANU_GMG', 'HOOKZOF', 'MMPX12', 'ROOSTERKID_OPENPROXYLIST', 'SHIFTY', 'THE_SPEEDX', 'OPENPROXYLIST_XYZ']),
//     'https': mergeLink('https', ['PROXY_SCAPPER', 'TELEGRAM', 'MANU_GMG', 'HOOKZOF', 'MMPX12', 'ROOSTERKID_OPENPROXYLIST', 'SHIFTY', 'THE_SPEEDX', 'OPENPROXYLIST_XYZ']),
//     'socks4': mergeLink('socks4', ['PROXY_SCAPPER', 'TELEGRAM', 'MANU_GMG', 'HOOKZOF', 'MMPX12', 'ROOSTERKID_OPENPROXYLIST', 'SHIFTY', 'THE_SPEEDX', 'OPENPROXYLIST_XYZ']),
//     'socks5': mergeLink('socks5', ['PROXY_SCAPPER', 'TELEGRAM', 'MANU_GMG', 'HOOKZOF', 'MMPX12', 'ROOSTERKID_OPENPROXYLIST', 'SHIFTY', 'THE_SPEEDX', 'OPENPROXYLIST_XYZ']),
// }

FULL_LINK.AUTO_CHECK = {
    'http': mergeLink('http', ['PROXY_SCAPPER']),
}
module.exports = {
    FULL_LINK
}
