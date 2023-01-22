const {Router} = require('express')
const {add, delete_subcategory, edit, index} = require('../controller/SubCategory.Controller')

const SubCategory = Router()

SubCategory.get('/', index)
SubCategory.post('/add', add)
SubCategory.post('/edit/:id', edit)
SubCategory.delete('/delete/:id', delete_subcategory)


module.exports= SubCategory