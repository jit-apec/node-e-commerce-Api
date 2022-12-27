const { DataTypes } = require('sequelize')

const CategoryModel =  (sequelize) => {
    const  category = sequelize.define('category',{
        categoryName: { type: DataTypes.STRING},
        ancestorId: { type: DataTypes.INTEGER},
        descendantId: { type: DataTypes.INTEGER },
        nodePath : { type: DataTypes.STRING},
    })
    return category
}
module.exports = CategoryModel