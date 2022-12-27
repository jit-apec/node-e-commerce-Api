const { DataTypes } = require('sequelize')

const DepartmentModel = (sequelize) => {
    const department = sequelize.define('department', {
        departmentName: {type: DataTypes.STRING},
        categoryId: { type: DataTypes.INTEGER}
    })
    return department
}

module.exports = DepartmentModel