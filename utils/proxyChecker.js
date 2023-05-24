const ProxyAgent = require('proxy-agent')
const request = require('request')
const path = require('path')
const fs = require('fs-extra');
const { TIMEOUT, BOT } = require('../config/proxyChecker');
const { logSuccess, logBad } = require('.');

class ProxyChecker {
    constructor(proxies, options) {
        const { timeout = TIMEOUT, bot = BOT } = options
        this.totalProxy = proxies.length;
        this.proxies = proxies
        this.timeout = timeout;
        this.bot = bot
        this.working = 0;
        this.not_working = 0;
        this.checked = 0;
        this.finished = 0;
        this.http = 0
        this.socks4 = 0
        this.socks5 = 0
        this.http_not_working = 0
        this.socks4_not_working = 0
        this.socks5_not_working = 0
        this.resolve = null
        this.reject = null
        this.proxiesSuccess = []
    }

    start() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
            for (let i = 0; i < this.bot; i++) {
                this.check(this.proxies[i])
            }
        })
    }


    // title(text) {
    //     if (process.platform === 'win32') {
    //         process.title = text;
    //     } else {
    //         process.stdout.write('\x1b]2;' + text + '\x1b\x5c');
    //     }
    // }

    updateStatus(working, not_working, proxy_type) {
        this.working += working;
        this[proxy_type] += working;

        this.not_working += not_working;
        this[`${proxy_type}_not_working`] += not_working;

        this.finished = this.not_working + this.working;

        // this.title(`ALIVE: ${this.working}/${this.totalProxy} | CHECK: ${this.finished}`);
        console.clear()
        process.stdout.write(
            false ? '\x1B[H\x1B[2J' : '\x1B[2J\x1B[3J\x1B[H\x1Bc'
        );
        logSuccess('\nTOTAL WORKING: ' + this.working);
        logSuccess('HTTP: ' + this.http);
        logSuccess('SOCKS5: ' + this.socks5);
        logSuccess('SOCKS4: ' + this.socks4);
        logBad('\nTOTAL BAD: ' + this.not_working)
        logBad('HTTP: ' + this.http_not_working);
        logBad('SOCKS5: ' + this.socks5_not_working);
        logBad('SOCKS4: ' + this.socks4_not_working);
        // console.log(chalk.hex('#388E3C')('\nWORKING: ' + this.working + '\nBAD: ' + this.not_working));
        if (this.finished >= this.totalProxy) {
            // console.log(chalk.hex('#388E3C')('DONE !\nWORKING: ' + this.working + '\nBAD: ' + this.not_working));
            logSuccess('DONE !');
            this.resolve(null)
        }
    }

    saveToFile(pathFile = 'proxy') {
        const pathParent = path.join('public', pathFile)
        fs.emptyDirSync(pathParent)
        this.proxiesSuccess.forEach(proxyObject => {
            const { proxy, type } = proxyObject
            const pathSaveFile = path.join(pathParent, type.toUpperCase() + '.txt')
            fs.appendFile(pathSaveFile, proxy + '\n', (err) => {
                if (err) throw err;
            })
        })
    }

    check(proxyObject) {
        // console.log('proxyObject', proxyObject)
        const { type: proxy_type, proxy } = proxyObject
        const options = {
            uri: 'http://example.com',
            method: 'GET',
            agent: new ProxyAgent(proxy_type + '://' + proxy),
            timeout: Number(this.timeout)
        };

        request.get(options, (error, response) => {
            if (error) {
                // logBad(`[DEAD] ==> ${proxy}`);
                this.updateStatus(0, 1, proxy_type)
            }
            else if (response.body.includes('Example')) {
                // logSuccess(`[${proxy_type.toUpperCase()}] ==> ${proxy}`);
                this.updateStatus(1, 0, proxy_type)
                this.proxiesSuccess.push(proxyObject)
            } else {
                // logBad(`[DEAD] ==> ${proxy}`);
                this.updateStatus(0, 1, proxy_type)
            }

            if (this.checked < this.totalProxy) this.check(this.proxies[this.checked])
            return
        });

        
        // const options = {
        //     uri: 'https://my-sso.malwarebytes.com/auth',
        //     method: 'POST',
        //     agent: new ProxyAgent(proxy_type + '://' + proxy),
        //     timeout: Number(this.timeout),
        //     headers: {
        //         'User-Agent': 'MBAM/4.3.0.98 (build: 1.0.1173; Windows 10.0.17763)',
        //         'Connection': 'Keep-Alive',
        //         'Accept-Language': 'en-US,*',
        //         'Content-Type': 'application/json',
        //     },
        //     json: {
        //         "email": "gunawanjae@outlook.es", "password": "0996Sw@nny", "generate_holocron_token": true
        //     }
        // };

        // request.post(options, (error, response) => {
        //     let statusCode = response?.statusCode
        //     if (error) {
        //         // logBad(`[DEAD] ==> ${proxy}`);
        //         this.updateStatus(0, 1, proxy_type)
        //     }
        //     else if (statusCode == 201|| statusCode == 429 ) {
        //         // logSuccess(`[${proxy_type.toUpperCase()}] ==> ${proxy}`);
        //         this.updateStatus(1, 0, proxy_type)
        //         this.proxiesSuccess.push(proxyObject)
        //     } else {
        //         // logBad(`[DEAD] ==> ${proxy}`);
        //         this.updateStatus(0, 1, proxy_type)
        //     }

        //     if (this.checked < this.totalProxy) this.check(this.proxies[this.checked])
        //     return
        // });

        this.checked += 1;

    }
}

module.exports = {
    ProxyChecker
}