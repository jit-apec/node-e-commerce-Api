const { Product, Category, SubCategory } = require('../connection/db')
const DeleteImage = require('../utils/common files/DeleteImage')
const { productAddValidation, productUpdateValidation } = require('../validation/Product-Validation')
const messages = require('../lang/message')
const sequelize = require('sequelize')


const index = async (req, res) => {
    try {
        const data = await Product.findAll({
            attributes: [
                'id',
                'imagePath',
                'title',
                'description',
                'price',
                'color',
                'quantity',
                'isActive',
                [sequelize.fn('date_format', sequelize.col('Product.createdAt'), '%d-%m-%Y %H:%i:%s'), 'Created_at'],
                [sequelize.fn('date_format', sequelize.col('Product.updatedAt'), '%d-%m-%Y %H:%i:%s'), 'Updated_at'],

            ],
            include: [{
                model: Category,
                attributes: ['name'],
            }, {
                model: SubCategory,
                attributes: ['name'],
            }],
        })
        if (!data) return res.status(404).send({ message: messages.DATA_NOT_FOUND, success: false })
        return res.status(200).send({ message: messages.PRODUCT_LIST, success: true, data: data })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}
const add = async (req, res) => {
    try {
        const validateData = await productAddValidation(req.body)
        const { title, description, price, color, quantity, categoryId, subcategoryId } = validateData

        if (!req.file) {
            throw new Error(messages.PLEASE_SELECT_IMAGE)
        }
        else if (req.file) {
            const imgPath = req.file.path
            await Product.create({ imagePath: imgPath, title, description, price, color, quantity, categoryId, subcategoryId })

        } else {
            await Product.create({ title, description, price, color, quantity, categoryId, subcategoryId })
        }
        return res.status(200).send({ message: messages.PRODUCT_ADDED_SUCCESS, success: true })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const validateData = await productUpdateValidation(req.body)
        const { title, description, price, color, quantity, categoryId, departmentId } = validateData
        const FindProduct = await Product.findOne({ where: { id } })
        if (!FindProduct) return res.status(404).send({ message: messages.DATA_NOT_FOUND, success: false, data: { id } })
        if (req.file) {
            const ImgPath = req.file.path
            const oldimg = FindProduct.imagePath
            await DeleteImage({ oldimg })
            await Product.update({ imagePath: ImgPath, title, description, price, color, quantity, categoryId, departmentId }, { where: { id } })
        } else {
            await Product.update({ title, description, price, color, quantity, categoryId, departmentId }, { where: { id } })
        }

        return res.status(200).send({ message: messages.PRODUCT_UPDATED_SUCCESS, success: true })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}
const delete_product = async (req, res) => {
    try {
        const { id } = req.body
        const FindProduct = await Product.findOne({ where: { id } })
        if (!FindProduct) return res.status(404).send({ message: messages.DATA_NOT_FOUND, success: false, data: { id } })
        const oldimg = FindProduct.imagePath
        await DeleteImage({ oldimg })
        await Product.destroy({ where: { id } })
        return res.status(200).send({ message: messages.PRODUCT_DELETED, success: true, data: { id } })

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}
const view = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOne(
            {
                where: { id },
                attributes: [
                    'title',
                    'imagePath',
                    'description',
                    'price',
                    'color',
                    'quantity',
                    [sequelize.fn('date_format', sequelize.col('Product.createdAt'), '%d-%m-%Y %H:%i:%s'), 'Created_at'],
                    [sequelize.fn('date_format', sequelize.col('Product.updatedAt'), '%d-%m-%Y %H:%i:%s'), 'Updated_at'],
                ],
                include: [{
                    model: Category,
                    attributes: ['name'],
                }, {
                    model: SubCategory,
                    attributes: ['name'],
                }],
            })
        if (!Product) return res.status(404).send({ message: messages.DATA_NOT_FOUND, success: false, data: { id } })
        return res.status(200).send({ message: messages.PRODUCT_FOUND, success: true, data: { product } })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}
module.exports = {
    index,
    add,
    update,
    delete_product,
    view,
}