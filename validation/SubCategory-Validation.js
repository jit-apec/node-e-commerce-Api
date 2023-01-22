const Joi = require('Joi')

const AddSubCategoryValidation = async(data) => {
    try {
            schema = Joi.object({
                name: Joi.string().min(2).max(30).required(),
                category_id: Joi.number().integer().min(1).max(5).required(),
            })
            const value = await schema.validateAsync(data)
            return value
    } catch (error) {
        throw new Error(error)
    }
}

const UpdateSubCategoryValidation = async (data) => {
    try {
        schema = Joi.object({
            name: Joi.string().min(2).max(30).required(),
        })
        const value = await schema.validateAsync(data)
        return value
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    AddSubCategoryValidation,
    UpdateSubCategoryValidation,
}
