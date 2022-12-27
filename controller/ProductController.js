const {Product} = require('../connection/db')

const  index = async (req, res) => {
    try {
        const data = await Product.findAll()
        if(!data) return res.status(404).send({message:"no data found", success:false})
        return res.status(200).send({message:"admin data " , success:true, data:data})
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false , data:{}})
    }
}
const add = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false , data:{}})
    }
}
const update = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false , data:{}})
    }
}
const delete_product = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false , data:{}})
    }
}
const view = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false , data:{}})
    }
}
module.exports = {
    index,
    add,
    update,
    delete_product,
    view,
}