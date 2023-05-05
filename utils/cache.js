const { LRUCache } = require('lru-cache')
const options = {
    max: 50,
    // for use with tracking overall storage size
    maxSize: 5000,
    sizeCalculation: (value, key) => {
        return 1
    },
    // how long to live in ms
    ttl: 1000 * 60 * 5,   // 5m

    // return stale items before removing from cache?
    allowStale: false,

    updateAgeOnGet: false,
    updateAgeOnHas: false,

    // async method to use for cache.fetch(), for
    // stale-while-revalidate type of behavior
}
const cache = new LRUCache(options)

const getLRUCache = ()=>{
    return cache
}
const setCache = (key, value) =>
    cache.set(key, value)
const getCache = (key) => {
    return cache.get(key)
}

module.exports = {
    setCache,
    getCache,
    getLRUCache
}