const { DataTypes } = require('sequelize')

const UserModel = ( sequelize) => {
    const users = sequelize.define('users', {
        name: { type: DataTypes.STRING},
        email: { type: DataTypes.STRING, unique: true },
        password: { type: DataTypes.STRING },
    })
    return users
}

module.exports = UserModel