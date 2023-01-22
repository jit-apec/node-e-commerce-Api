const Joi = require('Joi')

const AddCategoryValidation = async(data) => {
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

const UpdateCategoryValidation = async (data) => {
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
    AddCategoryValidation,
    UpdateCategoryValidation,
}
