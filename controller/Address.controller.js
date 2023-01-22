const { Address } = require('../connection/db')
const { AddAddressValidation, UpdateAddressValidation } = require('../validation/Address-Validation')
const messages = require('../lang/message')


const index = async (req, res) => {
    try {
        const data = await Address.findAll()
        if (!data) return res.status(404).send({ message: messages.NO_ADDRESS_FOUND, success: false })

        return res.status(200).send({ message: messages.ADDRESS_LIST, success: true, data: { data } })

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}

const add = async (req, res) => {
    try {

        const validateData = await AddAddressValidation(req.body)
        const { user_id, address, mobile, pin } = validateData

        const data = await Address.create({ userId: user_id, address_Name: address, mobile: mobile, pin: pin })

        if (data == 0) return res.status(500).send({ message: messages.SOMETHING_WENT_WRONG, success: false })

        return res.status(200).send({ message: messages.ADDRESS_ADDED_SUCCESS, success: true })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}

const edit = async (req, res) => {
    try {

        const { id } = req.params
        const validateData = await UpdateAddressValidation(req.body)
        const { address, mobile, pin } = validateData
        const data = await Address.update({ address_Name: address, mobile: mobile, pin: pin },{ where:{id} })

        if (data == 0) return res.status(500).send({ message: messages.SOMETHING_WENT_WRONG, success: false })

        return res.status(200).send({ message: messages.ADDRESS_UPDATED_SUCCESS, success: true })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}

const view = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Address.findAll({ where: { id } })
        if (!data) return res.status(404).send({ message: messages.NO_ADDRESS_FOUND, success: false })

        return res.status(200).send({ message: messages.ADDRESS_LIST, success: true, data: { data } })

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}

const delete_address = async (req, res) => {

    try {
        const { id } = req.params
        const FindProduct = await Address.findOne({ where: { id } })
        if (!FindProduct) return res.status(404).send({ message: messages.NO_ADDRESS_FOUND, success: false, data: { id } })

        await Address.destroy({ where: { id } })
        return res.status(200).send({ message: messages.ADDRESS_DELETED, success: true })

    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}


module.exports = {
    index,
    add,
    edit,
    view,
    delete_address,
}