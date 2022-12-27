const { DataTypes } = require('sequelize')

const ProductModel = (sequelize) => {
    const product = sequelize.define('product',{
        imagePath: { type: DataTypes.STRING},
        title: { type: DataTypes.STRING},
        description: { type: DataTypes.STRING},
        price: { type: DataTypes.INTEGER},
        color: { type: DataTypes.STRING},
        size: { type: DataTypes.STRING},
        quantity: { type: DataTypes.INTEGER},
        date: { type: DataTypes.DATE},
        categoryId: { type: DataTypes.INTEGER},
        departmentId: { type: DataTypes.INTEGER},
    })
    return product
}

module.exports = ProductModel