const cron = require('node-cron');
const { getProxy } = require('../controller/proxy.controller');

const sleep = (minutes)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(() => { 
      resolve(null)
     }, minutes*60*1000)
  })
}
const getProxyCache = async () => {
  await getProxy('PROXY_SCAPPER', 'http')
  await sleep(1)
  await getProxy('PROXY_SCAPPER', 'https')
  await sleep(1)
  await getProxy('PROXY_SCAPPER', 'socks4')
  await sleep(1)
  await getProxy('PROXY_SCAPPER', 'socks5')
}
proxyCron = () => {
  
  cron.schedule('*/5 * * * * ', () => {
    getProxyCache()
  });
 
};

module.exports = { proxyCron }