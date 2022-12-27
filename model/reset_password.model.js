const { DataTypes } = require('sequelize')

const ResetPasswordModel = (sequelize) => {
    const ResetPassword = sequelize.define('reset_password',{
        // id: { type: DataTypes.INTEGER,
        //     autoIncrement: false,
        //     primaryKey: false,
        // },
        email: {type: DataTypes.STRING},
        token: {type: DataTypes.STRING},
    })
    return ResetPassword
}
module.exports = ResetPasswordModel