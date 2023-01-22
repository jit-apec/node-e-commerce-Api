const { DataTypes } = require('sequelize')

const SubCategoryModel =  (sequelize) => {
    const  subcategory = sequelize.define('subcategory',{
        Name: { type: DataTypes.STRING},
        categoryId: { type: DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'id',
            },
        },
    })
    return subcategory
}
module.exports = SubCategoryModel