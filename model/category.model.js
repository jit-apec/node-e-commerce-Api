const { DataTypes } = require('sequelize')

const CategoryModel =  (sequelize) => {
    const  category = sequelize.define('category',{
        Name: { type: DataTypes.STRING},
    })
    return category
}
module.exports = CategoryModel