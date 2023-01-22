const Joi = require('joi')

const AddToCartValidate = async (data) => {

    try {
        schema = Joi.object({
            user_id: Joi.number().integer().min(1).max(10).required(),
            product_id: Joi.number().integer().min(1).max(10).required(),
            qty: Joi.number().integer().min(1).max(10000).required(),
        })
        const value = schema.validateAsync(data)
        return value
    } catch (error) {
        throw new Error(error)
    }

}

const UpdateCartValidate = async (data) => {

    try {
        schema = Joi.object({
            user_id: Joi.number().integer().min(1).max(10).required(),
            product_id: Joi.number().integer().min(1).max(10).required(),
            qty: Joi.number().integer().min(1).max(10).required(),
        })
        const value = schema.validateAsync(data)
        return value
    } catch (error) {
        throw new Error(error)
    }

}



module.exports = {
    AddToCartValidate,
    UpdateCartValidate,
}