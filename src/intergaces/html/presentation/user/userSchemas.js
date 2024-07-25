const Joi = require('joi');

module.exports = () => ({
    create: Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        senha: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
});