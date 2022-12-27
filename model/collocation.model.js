const {DataTypes} = require('sequelize')

const CollocationModel = ( sequelize) => {
    const collocation  = sequelize.define('collocation',{
        productId: { type: DataTypes.INTEGER},
        variantId: { type: DataTypes.INTEGER},
        variantData: { type: DataTypes.STRING},
        productData: { type: DataTypes.STRING},
    })
    return collocation
}   
module.exports = CollocationModel