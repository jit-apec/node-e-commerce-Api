const Joi = require("joi")

const AddAddressValidation = async (data) => {
    try {
        schema = Joi.object({
            user_id: Joi.number().integer().min(1).max(5).required(),
            address : Joi.string().min(5).max(50).required(),
            mobile : Joi.string().min(7).max(15).required(),
            pin: Joi.string().min(6).max(6).required(),
        })
        const value =  schema.validateAsync(data)
        return value
    } catch (error) {
        throw new Error(error)
    }

}

const UpdateAddressValidation = async (data) => {
    try {
        schema = Joi.object({
            address : Joi.string().min(5).max(50).required(),
            mobile : Joi.string().min(7).max(15).required(),
            pin: Joi.string().min(6).max(6).required(),
        })
        const value =  schema.validateAsync(data)
        return value
    } catch (error) {
        throw new Error(error)
    }

}


module.exports = {
    AddAddressValidation,
    UpdateAddressValidation,
}
