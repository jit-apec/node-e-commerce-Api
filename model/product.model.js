const { DataTypes } = require('sequelize')

const ProductModel = (sequelize) => {
    const product = sequelize.define('product', {
        imagePath: { type: DataTypes.STRING },
        title: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        price: { type: DataTypes.INTEGER },
        color: { type: DataTypes.STRING },
        quantity: { type: DataTypes.INTEGER },
        categoryId: { type: DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'id',
            },
        },
        subcategoryId: { type: DataTypes.INTEGER,
            references: {
                model: 'subcategories',
                key: 'id',
            },
        },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    })
    return product
}

module.exports = ProductModel