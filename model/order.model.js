const { DataTypes } = require('sequelize')

const Order =  (sequelize) => {
    const  order = sequelize.define('order',{
        userId: { type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        
        },
        productId: { type: DataTypes.INTEGER,
            references:{
                model: 'products',
                key: 'id'
            }
        },
        quantity: { type: DataTypes.INTEGER},
        order_address: { type: DataTypes.STRING},
        price: { type: DataTypes.STRING},
        pin:{ type: DataTypes.INTEGER},
        mobile: { type: DataTypes.STRING}
    })
    return order
}
module.exports = Order