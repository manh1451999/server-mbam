const fs = require('fs-extra');
const { LIST_RANDOM_NAME } = require('../constants/random');
const chalk = require('chalk')

const getRandomInt = (start = 0, end = 9) => {
    min = Math.ceil(start);
    max = Math.floor(end);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.logBad = (str) => {
    this.dead = console.log(chalk.hex('#D32F2F')(str));
}
module.exports.logSuccess = (str) => {
    this.dead = console.log(chalk.hex('#388E3C')(str));
}

module.exports.numberWithCommas = (number, commas='.') =>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, commas);
}

module.exports.getNameRandom = () => {
    let max = LIST_RANDOM_NAME.length - 1
    let index = Math.floor(Math.random() * (max + 1));
    return LIST_RANDOM_NAME[index]
}

module.exports.randomBankAccount = () => {
    let account_number = "";
    for (let i = 0; i < 13; i++) {
        account_number += getRandomInt().toString()
    }
    return account_number
}

module.exports.clearObject = (object) => {
    try {
        let objectNew = { ...object };
        Object.keys(object).forEach(key => {
            if (object[key] == undefined || object[key] == null) delete objectNew[key]
        })
        return objectNew
    }
    catch (err) {
        return object
    }

}

module.exports.clearUndefinedObject = (object) => {
    try {
        let objectNew = { ...object };
        Object.keys(object).forEach(key => {
            if (object[key] == undefined) delete objectNew[key]
        })
        return objectNew
    }
    catch (err) {
        return object
    }

}

module.exports.shallowEqual = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }
    return true;
}


module.exports.saveFileFromBufferMulter = (file, filename, path = `./public/data/uploads`) => {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    let name = filename || file.fieldname + '-' + Date.now() + '.' + extension
    fs.writeFileSync(`${path}/${name}`, file.buffer)
    return `${path}/${name}`
}

module.exports.deleteFileFromPath = (path) => {
    if (!path) return;
    try {
        if (fs.pathExistsSync(path)) fs.removeSync(path)

    } catch (err) {
        console.log('err', err)
    }
}

const capitalizeFirstLetter = (string) => {
    return string.trim().split(" ").map(item => item[0].toUpperCase() + item.slice(1).toLowerCase()).join(" ")
}

