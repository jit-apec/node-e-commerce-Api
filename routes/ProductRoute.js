const {Router} = require('express')
const {add, delete_product, index, update, view} = require('../controller/Product.Controller')
const Auth = require('../middleware/Auth')    
const upload = require('../middleware/upload') 

const ProductRoute = Router()
ProductRoute.get('/', index)
ProductRoute.post('/add', upload.single('image'), add)
ProductRoute.post('/update/:id', upload.single('image'), update)
ProductRoute.get('/view/:id',  view)
ProductRoute.delete('/delete', delete_product)

module.exports = ProductRoute