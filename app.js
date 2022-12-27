const express = require('express')
const app = express()
const AuthRouter = require('./routes/AuthRoute')
const ProductRouter = require('./routes/ProductRoute')

app.use(express.json())
app.use('/auth', AuthRouter)
app.use('/product', ProductRouter)

module.exports = app