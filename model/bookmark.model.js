const {DataTypes} = require('sequelize')

const BookmarkModel = (sequelize) => {
    const bookmark = sequelize.define('bookmark',{
        userId: { type: DataTypes.INTEGER},
        productId: { type: DataTypes.INTEGER},
        variantId: { type: DataTypes.INTEGER},
    })
    return bookmark
}

module.exports = BookmarkModel