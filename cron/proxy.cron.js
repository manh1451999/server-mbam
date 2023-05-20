const cron = require('node-cron', false);
const { getProxy } = require('../controller/proxy.controller');
const { numberWithCommas } = require('../utils');
const { ProxyChecker } = require('../utils/proxyChecker');

const sleep = (minutes) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
    }, minutes * 60 * 1000)
  })
}
const getProxyCache = async () => {
  await getProxy('JUPROXY', 'http', false)
  await sleep(1)
  await getProxy('JUPROXY', 'https', false)
  await sleep(1)
  await getProxy('JUPROXY', 'socks4', false)
  await sleep(1)
  await getProxy('JUPROXY', 'socks5', false)
}


const checkProxy = async () => {
  console.log('loading proxy ...')
  let [http, https, socks4, socks5] = await Promise.all([
    getProxy('AUTO_CHECK', 'http', false),
    getProxy('AUTO_CHECK', 'https', false),
    getProxy('AUTO_CHECK', 'socks4', false),
    getProxy('AUTO_CHECK', 'socks5', false),
  ])
  console.log('done!')
  http = [...new Set([...http, ...https])].map(proxy => ({ type: 'http', proxy }))
  socks4 = [...new Set(socks4)].map(proxy => ({ type: 'socks4', proxy }))
  socks5 = [...new Set(socks5)].map(proxy => ({ type: 'socks5', proxy }))

  // http = [...http, ...https].map(proxy => ({ type: 'http', proxy }))
  // socks4 = [...socks4].map(proxy => ({ type: 'socks4', proxy }))
  // socks5 = [...socks5].map(proxy => ({ type: 'socks5', proxy }))

  console.log(`total: ${numberWithCommas(http.length + socks4.length + socks5.length)}`)
  console.log(`http: ${numberWithCommas(http.length)}`)
  console.log(`socks4: ${numberWithCommas(socks4.length)}`)
  console.log(`socks5: ${numberWithCommas(socks5.length)}`)
  console.log(`\n`)
  const options = {
    timeout: 3000,
    bot: 50
  }
  const proxies = [...http, ...socks4, ...socks5]
  const checker = new ProxyChecker(proxies, options);
  await checker.start()
  checker.saveToFile()
}

proxyCron = () => {

  // cron.schedule('*/5 * * * * ', () => {
  //   getProxyCache()
  // });

  // checkProxy()
  cron.schedule('0 */2 * * *', () => {
    checkProxy()
  });

};

module.exports = { proxyCron }