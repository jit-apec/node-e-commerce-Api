const Joi = require('joi')

const productAddValidation = async (data) => {
    try {
        schema = Joi.object({
            title: Joi.string().min(3).max(30).required(),
            description: Joi.string().min(3).allow('').optional(),
            price: Joi.number().integer().min(1).optional(),
            color: Joi.string().min(3).optional(),
            quantity: Joi.number().integer().min(1).optional(),
            categoryId: Joi.number().integer().min(1).optional(),
            subcategoryId: Joi.number().integer().min(1).optional(),
            isActive: Joi.boolean().optional(),
            isDeleted: Joi.boolean().optional(),
        })
        const value = await schema.validateAsync(data)
        return value
    } catch (error) {
        throw new Error(error)
    }
}
const productUpdateValidation = async (data) => {
    try {
        schema = Joi.object({   
            title: Joi.string().min(3).max(30).optional(),
            description: Joi.string().min(3).allow('').optional(),
            price: Joi.number().integer().min(1).optional(),
            color: Joi.string().min(3).optional(),
            quantity: Joi.number().integer().min(1).optional(),
            categoryId: Joi.number().integer().min(1).optional(),
            departmentId: Joi.number().integer().min(1).optional(),
            isActive: Joi.boolean().optional(),
            isDeleted: Joi.boolean().optional(),
        })
        const value = await schema.validateAsync(data)
        return value
    }catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    productAddValidation,
    productUpdateValidation,
}

