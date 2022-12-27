const { DataTypes } = require('sequelize')

const CartModel = (sequelize) => {
    const cart = sequelize.define('cart',{
        totalQty: { type: DataTypes.STRING},
        totalPrice: { type: DataTypes.STRING},
        userId: { type: DataTypes.INTEGER},
        itemsId: { type: DataTypes.STRING},
    })
    return cart
}

module.exports = CartModel