var FULL_LINK = {
    JUPROXY: {
        'https': ["https://www.juproxy.com/api?token=qSZJgl4ojbao7BIUPh2Y8r6JRtXTzfAOLXkl44qy&type=https"],
        'http': ["https://www.juproxy.com/api?token=qSZJgl4ojbao7BIUPh2Y8r6JRtXTzfAOLXkl44qy&type=http"],
        'socks4': ["https://www.juproxy.com/api?token=qSZJgl4ojbao7BIUPh2Y8r6JRtXTzfAOLXkl44qy&type=socks4"],
        'socks5': ["https://www.juproxy.com/api?token=qSZJgl4ojbao7BIUPh2Y8r6JRtXTzfAOLXkl44qy&type=socks5"],
    },
    SERVER_MBAM:{
        'http': ["https://raw.githubusercontent.com/manh1451999/server-mbam/master/public/proxy/HTTP.txt"],
        'socks4': ["https://raw.githubusercontent.com/manh1451999/server-mbam/master/public/proxy/SOCKS4.txt"],
        'socks5': ["https://raw.githubusercontent.com/manh1451999/server-mbam/master/public/proxy/SOCKS5.txt"],
    },
    SERVER_MBAM_STATIC:{
        'http': ["https://raw.githubusercontent.com/manh1451999/server-mbam/master/public/proxy-static/HTTP.txt"],
        'socks4': ["https://raw.githubusercontent.com/manh1451999/server-mbam/master/public/proxy-static/SOCKS4.txt"],
        'socks5': ["https://raw.githubusercontent.com/manh1451999/server-mbam/master/public/proxy-static/SOCKS5.txt"],
    },
    PROXY_SCAPPER: {
        'http': ["https://api.proxyscrape.com/v2/?request=getproxies&timeout=10000&country=all&ssl=all&anonymity=all&protocol=http"],
        'https': ["https://api.proxyscrape.com/v2/?request=getproxies&timeout=10000&country=all&ssl=all&anonymity=all&protocol=https"],
        'socks4': ["https://api.proxyscrape.com/v2/?request=getproxies&timeout=10000&country=all&ssl=all&anonymity=all&protocol=socks4"],
        'socks5': ["https://api.proxyscrape.com/v2/?request=getproxies&timeout=10000&country=all&ssl=all&anonymity=all&protocol=socks5"],
    },
    MONOSANS: {
        'http': ['https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt'],
        'socks4': ['https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks4.txt'],
        'socks5': ['https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks5.txt'],

    },
    MERTGUVENCLI: {
        'http': ["https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.txt"],
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

FULL_LINK.AUTO_CHECK = {
    'http': mergeLink('http', ['SERVER_MBAM', 'SERVER_MBAM_STATIC', 'PROXY_SCAPPER', 'MONOSANS', 'MERTGUVENCLI', 'TELEGRAM', 'MANU_GMG', 'HOOKZOF', 'MMPX12', 'ROOSTERKID_OPENPROXYLIST', 'SHIFTY', 'THE_SPEEDX', 'OPENPROXYLIST_XYZ']),
    'https': mergeLink('https', ['PROXY_SCAPPER', 'TELEGRAM', 'MANU_GMG', 'HOOKZOF', 'MMPX12', 'ROOSTERKID_OPENPROXYLIST', 'SHIFTY', 'THE_SPEEDX', 'OPENPROXYLIST_XYZ']),
    'socks4': mergeLink('socks4', ['SERVER_MBAM', 'SERVER_MBAM_STATIC', 'PROXY_SCAPPER', 'MONOSANS', 'TELEGRAM', 'MANU_GMG', 'HOOKZOF', 'MMPX12', 'ROOSTERKID_OPENPROXYLIST', 'SHIFTY', 'THE_SPEEDX', 'OPENPROXYLIST_XYZ']),
    'socks5': mergeLink('socks5', ['SERVER_MBAM', 'SERVER_MBAM_STATIC', 'PROXY_SCAPPER', 'MONOSANS', 'TELEGRAM', 'MANU_GMG', 'HOOKZOF', 'MMPX12', 'ROOSTERKID_OPENPROXYLIST', 'SHIFTY', 'THE_SPEEDX', 'OPENPROXYLIST_XYZ']),
}


FULL_LINK.SCAN = {
    'http': mergeLink('http', ['SERVER_MBAM', 'SERVER_MBAM_STATIC']),
    'socks4': mergeLink('socks4', ['SERVER_MBAM', 'SERVER_MBAM_STATIC']),
    'socks5': mergeLink('socks5', ['SERVER_MBAM', 'SERVER_MBAM_STATIC']),
}

// FULL_LINK.AUTO_CHECK = {
//     'http': mergeLink('http', ['PROXY_SCAPPER']),
//     'https':[],
//     'socks4': [],
//     'socks5': [],
// }
module.exports = {
    FULL_LINK
}
