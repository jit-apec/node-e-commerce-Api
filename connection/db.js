const Sequelize = require('sequelize')
require('dotenv').config()

const CartModel = require('../model/cart.model')
const CategoryModel = require('../model/category.model')
const UserModel = require('../model/user.model')
const ProductModel = require('../model/product.model')
const ResetPasswordModel = require('../model/reset_password.model')
const SubCategoryModel = require('../model/subCategory.model')
const OrderModel = require('../model/order.model')
const AddressModel = require('../model/address.model')

const DATABASE =process.env.DATABASE 
const USERNAME = process.env.DATABASE_USERNAME
const PASSWORD = process.env.PASSWORD 
const HOST = process.env.DATABASE_HOST 
const DIALECT = process.env.DIALECT 


const sequelize = new Sequelize(DATABASE,USERNAME,PASSWORD,{
    host: HOST,
    dialect: DIALECT,
})

sequelize.authenticate().then(() => {
    console.log(HOST);
    console.log('Db connection established');
}).catch((error) => {
    console.log(`Error ${error}`);   
})


var db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: UserModel(sequelize),
    Address: AddressModel(sequelize),
    Category: CategoryModel(sequelize),
    SubCategory: SubCategoryModel(sequelize),
    Order: OrderModel(sequelize),
    Product: ProductModel(sequelize),
    Cart: CartModel(sequelize),
    ResetPassword: ResetPasswordModel(sequelize),
}


////////////////////////////////////////////////////////////////////////////////

// db.User.hasOne(db.Cart, {foreignKey:'user_id'})
// db.Cart.belongsTo(db.User, {foreignKey:'user_id'})


// db.Order.belongsTo(db.Product, {foreignKey:'product_id'})
// db.Product.hasMany(db.Order, {foreignKey:'product_id'})


// db.Order.belongsTo(db.Address, {foreignKey:'address_id'})
// db.Address.hasOne(db.Order, {foreignKey:'address_id'})

db.Product.hasMany(db.Cart, {foreignKey:'ProductId'})
db.Cart.belongsTo(db.Product, {foreignKey:'ProductId'})

db.Category.hasMany(db.Product,{foreignKey: 'categoryId'})
db.Product.belongsTo(db.Category,{ foreignKey: 'categoryId'})

db.SubCategory.hasMany(db.Product,{foreignKey: 'subcategoryId'})
db.Product.belongsTo(db.SubCategory,{ foreignKey: 'subcategoryId'})

db.Category.hasMany(db.SubCategory,{foreignKey: 'categoryId'})
db.SubCategory.belongsTo(db.Category,{ foreignKey: 'categoryId'})

//////////////////////////////////////////////////////////////////////////////////

sequelize.sync()

module.exports = db