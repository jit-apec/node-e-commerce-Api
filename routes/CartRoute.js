const {Router} = require('express')
const {index, add, delete_cart_product, edit} = require('../controller/Cart.controller')

const CartRoute = Router()
CartRoute.get('/:id',index)
CartRoute.post('/add',add)
CartRoute.post('/edit',edit)
CartRoute.delete('/delete/:id',delete_cart_product)

module.exports = CartRoute