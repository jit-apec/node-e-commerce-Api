const {Router} = require('express')
const {add, delete_product, index, update, view} = require('../controller/ProductController')
const Auth = require('../middleware/Auth')    

const ProductRoute = Router()
ProductRoute.get('/',Auth,index)
ProductRoute.post('/add',Auth,add)
ProductRoute.post('/update',Auth,update)
ProductRoute.get('/view',Auth,view)
ProductRoute.delete('/delete',Auth,delete_product)

module.exports = ProductRoute