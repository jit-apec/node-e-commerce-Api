const {Router} = require('express')
const {register, login, requestPassword,resetPassword} = require('../controller/AuthController')

const AuthRouter = Router()

AuthRouter.post('/register', register)
AuthRouter.post('/login', login)
AuthRouter.post('/requestPassword',requestPassword)
AuthRouter.post('/resetPassword',resetPassword)

module.exports = AuthRouter