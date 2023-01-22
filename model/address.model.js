const { DataTypes } = require('sequelize')

const Address =  (sequelize) => {
    const  address = sequelize.define('address',{
        userId: {
             type: DataTypes.INTEGER,
                references:{
                    model: 'users',
                    key: 'id'
                }
            },
        address_Name: { type: DataTypes.STRING},
        mobile : { type: DataTypes.STRING},
        pin: { type: DataTypes.INTEGER},
    })
    return address
}
module.exports = Address