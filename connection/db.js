const Sequelize = require('sequelize')
const BookmarkModel = require('../model/bookmark.model')
const CartModel = require('../model/cart.model')
const CategoryModel = require('../model/category.model')
const CollocationModel = require('../model/collocation.model')
const DepartmentModel = require('../model/department.model')
const UserModel = require('../model/user.model')
const ProductModel = require('../model/product.model')
const VariantModel = require('../model/variant.model')
const ResetPasswordModel = require('../model/reset_password.model')


const sequelize = new Sequelize('e_commerce','root','',{
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log('Db connection established');
}).catch((error) => {
    console.log(`Error ${error}`);   
})


var db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: UserModel(sequelize),
    Category: CategoryModel(sequelize),
    Department: DepartmentModel(sequelize),
    Product: ProductModel(sequelize),
    Cart: CartModel(sequelize),
    Variant: VariantModel(sequelize),
    Collocation: CollocationModel(sequelize),
    Bookmark: BookmarkModel(sequelize),
    ResetPassword: ResetPasswordModel(sequelize),
}


//department table
db.Department.hasMany(db.Category,{foreignKey:'categoryId'})
db.Category.belongsTo(db.Department,{foreignKey:'categoryId'})

//product table
db.Product.hasMany(db.Category,{foreignKey:'categoryId'})
db.Category.belongsTo(db.Product,{foreignKey:'categoryId'})

db.Product.hasMany(db.Department,{foreignKey:'departmentId'})
db.Department.belongsTo(db.Product,{foreignKey:'departmentId'})

//cart table
db.Cart.hasMany(db.Product,{foreignKey:'itemsId'})
db.Product.belongsTo(db.Cart,{foreignKey:'itemsId'})

db.Cart.hasMany(db.User,{foreignKey:'userId'})
db.User.belongsTo(db.Cart,{foreignKey:'userId'})

//variant table
db.Variant.hasMany(db.Product,{foreignKey:'productId'})
db.Product.belongsTo(db.Variant,{foreignKey:'productId'})

//collocation table
db.Collocation.hasMany(db.Product,{foreignKey:'productId'})
db.Product.belongsTo(db.Collocation,{foreignKey:'productId'})

db.Collocation.hasMany(db.Variant,{foreignKey:'variantId'})
db.Variant.belongsTo(db.Collocation,{foreignKey:'variantId'})

//bookmark table 
db.Bookmark.hasMany(db.User,{foreignKeys:'userId'})
db.User.belongsTo(db.Bookmark,{foreignKey:'userId'})

db.Bookmark.hasMany(db.Product,{foreignKeys:'productId'})
db.Product.belongsTo(db.Bookmark,{foreignKey:'productId'})

db.Bookmark.hasMany(db.Variant,{foreignKeys:'variantId'})
db.Variant.belongsTo(db.Bookmark,{foreignKey:'variantId'})
sequelize.sync()

module.exports = db