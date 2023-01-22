const Joi = require('joi')

const registerValidation = async (data) => {

    try {
        schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
        })
        const value = await schema.validateAsync(data)
        return value
    } catch (error) {
        throw new Error(error)
    }
}
const loginValidation = async (data) => {
    try {
        schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
        })
        const value = await schema.validateAsync(data)
        return value
    } catch (error) {
        throw new Error(error)
    }
}
const AdminCreateValidation = async (data) => {
    try {
            schema = Joi.object({
            name: Joi.string().min(3).max().required(),
            email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','   net']}}),
            phone: Joi.number().integer().min(10).max(15),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$') ),
        })
        const value = await schema.validateAsync(data)
        return value
    } catch (error) {
        throw new Error(error)
    }
}   
const AdminUpdateValidation = async (data) => {
    
    try {
            schema = Joy.object({
            name: Joi.string().min(3).max().required(),
            email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['com','   net']}}),
            phone: Joi.number().integer().min(10).max(15),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$') ),
            })
            const value = await schema.validateAsync(data)
            return value
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    registerValidation,
    loginValidation,
    AdminCreateValidation,
    AdminUpdateValidation,
}                        