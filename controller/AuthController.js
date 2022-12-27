const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const mail = require('../utils/mail/mail')
const { User, ResetPassword} = require('../connection/db')
const {loginValidation, registerValidation} = require('../validation/Validation')

const register = async (req, res) => {
    try {
            const validatedData = await registerValidation(req.body)
            const { name, email, password } =validatedData
            const FindUser = await User.findOne({ email: email})
            if (FindUser) return res.status(400).send({ message:"This Email address already exists", success: true, data:email })
            const encPassword = await bcrypt.hash(password, 15)
            await User.create({name, email, password: encPassword})
            const data = { name, email}
            return res.status(200).send({message:"User Register Successfully", success:true, data:data})
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false , data:{}})
    }

}
const login = async (req, res) => {
    try {
            const validatedData = await loginValidation(req.body)
            const SECRET_KEY = process.env.SECRET_KEY
            const { email, password } = validatedData
            const FindEmail = await User.findOne({ where: { email } })
            const data = JSON.parse(JSON.stringify(FindEmail))
            if (data && (await bcrypt.compare(password, data.password))) {
                let token = JWT.sign({
                    id: data.id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email
                },
                    SECRET_KEY)
                JWT
                let payload = {
                    id: data.id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    token
                }
                return res.status(200).send({ message: "user Login successful", success: true, data: payload })
            }
            return res.status(404).send({ message: "Email or Password not found", success: false, data: req.body })
            
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false, data: {} })
    }
}
const requestPassword = async (req, res) => {
    try {
        const { email } = req.body
        const finduser = await User.findOne({ where: { email } })
        if (!finduser) return res.status(404).send({ message: "Email not found", success: false, data: email })
        const result = await mail({ email })
        return res.status(200).send(result)

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false, data: {} })
    }
}
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body
        const finduser = await ResetPassword.findOne({ where: { token } })
        if (!finduser) return res.status(404).send({ message: "Password reset token expire", status: false })
        const id = finduser.id
        const encPassword = await bcrypt.hash(password, 12)
        const result = await User.update({ password: encPassword }, { where: { id } })
        await ResetPassword.destroy({ where: { token } })
        console.log(result)
        return res.status(200).send({ message: "Password reset successfully!!", success: true })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false, data: {} })
    }
}
module.exports = {
    register,
    login,
    requestPassword,
    resetPassword,
}