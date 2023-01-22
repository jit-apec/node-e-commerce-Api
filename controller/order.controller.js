const { Order, Address, Cart, Product } = require('../connection/db')
const messages = require('../lang/message')
const sequelize = require('sequelize')

const PlaceOrder = async (req, res) => {
    try {
        const { user_id, qty, price, product_id, address, pin, phone_number } = req.body

        const add = await Address.findOne({
            where: {
                userId: user_id, 
                address_Name: address, 
                pin: pin
            }
        })
        if(!add){
            await Address.create({
                userId : user_id, 
                address_Name : address,
                mobile : phone_number,
                pin : pin
            })
        }
        await Order.create({ userId: user_id, productId: product_id, quantity: qty, order_address: address, price, pin, mobile: phone_number  })

        await Cart.destroy({
            where:{
                    userId: user_id, 
                    ProductId:product_id
                    // ProductId: {[sequelize.Op.in]:[product_id]}
                }
        })
      
        await Product.increment({quantity: - qty}, { where: { id: product_id} })
        return res.status(200).send({ message: messages.ORDER_SUCCESS, success: true })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }

}
const index = async(req, res) => {
    try {
        const {id} = req.params
        const data =await Order.findAll({where:{userId:id}})

        return res.status(200).send({ message: messages.ORDER_LIST, success: true , data:{data}})
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }

}
const view = async(req, res) => {
    try {
        const {id} = req.params
        const data =await Order.findAll({where:{id}})

        return res.status(200).send({ message: messages.ORDER_LIST, success: true , data:{data}})
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }

}

module.exports = {
    PlaceOrder,
    index,
    view
}
