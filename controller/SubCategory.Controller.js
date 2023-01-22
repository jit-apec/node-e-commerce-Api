const {SubCategory} = require('../connection/db')
const { AddSubCategoryValidation, UpdateSubCategoryValidation} = require('../validation/SubCategory-Validation')
const messages = require('../lang/message')


const index = async (req, res) => {
    try {
        const data = await SubCategory.findAll()
        if (!data) return res.status(404).send({ message: messages.DATA_NOT_FOUND, success: false })

        return res.status(200).send({ message: messages.SUB_CATEGORY_LIST, success: true, data: { data } })

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}
const add = async (req, res) => {
    try {
        const validateData = await AddSubCategoryValidation(req.body)
        const { name, category_id} = validateData

        const data = await SubCategory.create({ Name: name , categoryId: category_id})
        if (!data) return res.status(404).send({ message: messages.SOMETHING_WENT_WRONG, success: false })

        return res.status(200).send({ message: messages.SUB_CATEGORY_ADDED, success: true })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}

const edit = async (req, res) => {
    try {
        const { id } = req.params
        const validateData = await UpdateSubCategoryValidation(req.body)
        const { name } = validateData
        const FindProduct = await SubCategory.findOne({ where: { id } })
        console.log(name);
        if (!FindProduct) return res.status(404).send({ message: messages.SUB_CATEGORY_NOT_FOUND, success: false, data: { id } })
        
        await SubCategory.update({ Name: name }, { where: { id } })
        return res.status(200).send({ message: messages.SUB_CATEGORY_UPDATED, success: true })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}

const delete_subcategory = async (req, res) => {
    try {
        const { id } = req.params

        const data = await SubCategory.destroy({ where: { id } })
        if (data == 0) return res.status(500).send({ message: messages.SOMETHING_WENT_WRONG, success: false })

        return res.status(200).send({ message: messages.SUB_CATEGORY_DELETED, success: true })

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }

}

module.exports = {
    index,
    add,
    edit,
    delete_subcategory,
}