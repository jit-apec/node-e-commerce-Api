const { DataTypes } = require('sequelize')

const VariantModel = (sequelize) => {
    const variant = sequelize.define('variant',{
        imagePath: { type: DataTypes.STRING},
        color: { type: DataTypes.STRING },
        size: { type: DataTypes.STRING},
        quantity: { type: DataTypes.INTEGER },
        title: { type: DataTypes.STRING },
        price: { type: DataTypes.INTEGER },
        productId: { type: DataTypes.INTEGER },
    })
    return variant
}
module.exports = VariantModel