const Joi = require('joi');

module.exports = () => ({
    create: Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        createdBy: Joi.string(),
        users: Joi.array(),
        calendarInformation: Joi.array(),
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        senha: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }),

    updateSchedulesJoined: Joi.object({
        schedulesJoined: Joi.object()
    }),

    updateSchedulesCreated: Joi.object({
        email: Joi.string().email().required(),
        senha: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }),
});