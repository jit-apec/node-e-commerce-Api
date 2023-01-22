const { DataTypes } = require('sequelize')

const CartModel = (sequelize) => {
    const cart = sequelize.define('cart',{
        userId: { type: DataTypes.INTEGER,

            references: {
                model: 'users',
                key: 'id',
            }
            
        },
        ProductId: { type: DataTypes.INTEGER,
            references: {
                model: 'products',
                key: 'id',
            }
        },
        totalQty: { type: DataTypes.INTEGER},
    })
    return cart
}

module.exports = CartModel