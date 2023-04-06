const Joi = require('joi')

const mailSchemas = {
    readMailBox: Joi.object().keys({
        email: Joi.string().email().required(),
        pass: Joi.string().required(),
    }),
    checkLive: Joi.object().keys({
        email: Joi.string().email().required(),
        pass: Joi.string().required(),
    })
}

module.exports = mailSchemas