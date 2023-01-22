const {Router} = require('express')
const {add, delete_category, edit, index} = require('../controller/Category.Controller')

const CategoryRoute = Router()

CategoryRoute.get('/',index)
CategoryRoute.post('/add',add)
CategoryRoute.post('/edit/:id',edit)
CategoryRoute.delete('/delete/:id',delete_category)

module.exports = CategoryRoute