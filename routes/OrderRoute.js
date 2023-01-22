const { Router} = require('express')
const {PlaceOrder, index} = require('../controller/order.controller')

const OrderRouter = Router()

OrderRouter.post('/order-place', PlaceOrder)
OrderRouter.get('/:id',index)
module.exports = OrderRouter
