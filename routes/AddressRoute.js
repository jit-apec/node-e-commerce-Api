const { Router} = require('express')
const {add, delete_address, edit, index} = require('../controller/Address.controller')

const Address = Router()

Address.get('/:id', index)
Address.post('/add', add)
Address.post('/edit/:id', edit)
Address.delete('/delete/:id', delete_address)


module.exports= Address