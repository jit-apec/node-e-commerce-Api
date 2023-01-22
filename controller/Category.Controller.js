const { Category } = require('../connection/db')
const {AddCategoryValidation, UpdateCategoryValidation} = require('../validation/Category-Validation')
const messages = require('../lang/message')


const index = async (req, res) => {
    try {
        const data = await Category.findAll()
        if (!data) return res.status(404).send({ message: messages.DATA_NOT_FOUND, success: false })

        return res.status(200).send({ message: messages.CATEGORY_LIST, success: true, data: { data } })

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}
const add = async (req, res) => {
    try {

        const validateData = await AddCategoryValidation(req.body)
        const { name } = validateData

        const data = await Category.create({ Name: name })
        if (!data) return res.status(404).send({ message: messages.SOMETHING_WENT_WRONG, success: false })

        return res.status(200).send({ message: messages.CATEGORY_ADDED_SUCCESS, success: true })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}

const edit = async (req, res) => {
    try {
        const { id } = req.params
        const validateData = await UpdateCategoryValidation(req.body)
        const { name } = validateData 
        const FindProduct = await Category.findOne({ where: { id } })

        if (!FindProduct) return res.status(404).send({ message: messages.CATEGORY_NOT_FOUND, success: false, data: { id } })
        
        await Category.update({ Name: name }, { where: { id } })
        return res.status(200).send({ message: messages.CATEGORY_UPDATED, success: true })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}

const delete_category = async (req, res) => {
    try {
        const { id } = req.params

        const data = await Category.destroy({ where: { id } })
        if (data == 0) return res.status(500).send({ message: messages.SOMETHING_WENT_WRONG, success: false })

        return res.status(200).send({ message: messages.CATEGORY_DELETED, success: true })

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }


}

module.exports = {
    index,
    add,
    edit,
    delete_category,
}