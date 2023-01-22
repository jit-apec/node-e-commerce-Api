const { Cart, Product, Category, SubCategory } = require('../connection/db')

const { AddToCartValidate, UpdateCartValidate } = require('../validation/Cart-Validation')

const messages = require('../lang/message')
const sequelize = require('sequelize')

const index = async (req, res) => {

    try {
        const { id } = req.params
        const data = await Cart.findAll({
            attributes: [
                [
                    sequelize.literal(`(
                        SELECT SUM(carts.totalQty * products.price) as subTotal 
                        FROM 
                        carts INNER JOIN products ON products.id = carts.ProductId 
                        WHERE carts.userId = ${id}
                    )`),
                    'sub_total'
                ],

                'totalQty',
                'productId',
            ],
            include: [
                {
                    model: Product,
                    attributes: ['imagePath', 'title', 'price', 'color'],
                    include: [
                        {
                            model: Category,
                            attributes: ['Name'],
                        },
                        {
                            model: SubCategory,
                            attributes: ['Name'],
                        },
                    ],
                },
            ],
            where: {
                userId: id
            },
            raw: true, // convert to simple formate
            nest: true,    // display nested table data
            // plain: true   //it will only one result like laravel Pluck()
        })
        var total = 0;
        for (let i = 0; i < data.length; i++) {
            data[i]["product"]["sub_total"] = data[i].totalQty * data[i].product.price
            total = total + data[i]["product"]["sub_total"]
        }

        if (!data) return res.status(404).send({ message: messages.CART_EMPTY, success: false })

        return res.status(200).send({ message: messages.CART_DATA, success: true, data: {main_total:total,data } })
        // return res.status(200).send({ message: messages.CART_DATA, success: true, data: { data } })

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}
const add = async (req, res) => {

    try {

        const validateData = await AddToCartValidate(req.body)
        const { user_id, product_id, qty } = validateData

        const quantity = await Product.findOne({
            attributes: ['quantity'],
            where: { id: product_id }
        })
        if (quantity.dataValues.quantity >= qty) {
            const product = await Cart.findOne({
                where: {
                    userId: user_id,
                    ProductId: product_id
                }
            })
            if (product) {
            } else {
                const data = await Cart.create({
                    userId: user_id,
                    ProductId: product_id,
                    totalQty: qty
                })
                if (data == 0) return res.status(500).send({ message: messages.SOMETHING_WENT_WRONG, success: false })
            }
           
            return res.status(200).send({ message: messages.PRODUCT_ADDED_SUCCESS, success: true })
        } else {
            return res.status(200).send({ messages: messages.OUT_OF_STOCK, status: false })
        }
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}
const edit = async (req, res) => {

    try {
        const validateData = await UpdateCartValidate(req.body)
        const { user_id, product_id, qty } = validateData
        const data = await Cart.update({
            userId: user_id,
            totalQty: qty
        }, {
            where: {
                ProductId: product_id,
                userId: user_id
            }
        })

        if (data == 0) return res.status(500).send({ message: messages.SOMETHING_WENT_WRONG, success: false })

        return res.status(200).send({ message: messages.QUANTITY_UPDATED, success: true })

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}
const delete_cart_product = async (req, res) => {

    try {
        const { id } = req.params
        const FindProduct = await Cart.findOne({ where: { id } })
        if (!FindProduct) return res.status(404).send({ message: messages.DATA_NOT_FOUND, success: false, data: { id } })

        await Cart.destroy({ where: { id } })
        return res.status(200).send({ message: messages.PRODUCT_REMOVE_FROM_CART, success: true })

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}

module.exports = {
    index,
    add,
    edit,
    delete_cart_product,
}