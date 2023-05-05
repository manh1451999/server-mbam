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
  await getProxy('JUPROXY', 'http')
  await sleep(1)
  await getProxy('JUPROXY', 'https')
  await sleep(1)
  await getProxy('JUPROXY', 'socks4')
  await sleep(1)
  await getProxy('JUPROXY', 'socks5')
}
proxyCron = () => {
  
  cron.schedule('*/5 * * * * ', () => {
    getProxyCache()
  });
 
};

module.exports = { proxyCron }