var fs = require('fs')

async function DeleteImage(req, res){
    try {
        const isdeleted = fs.existsSync(req.oldimg)
        if (isdeleted) {
            fs.unlink(req.oldimg, (err) => {
                if (err) throw err
                console.log(`file deleted ${req.oldimg}`)
            })
        }
        return { message: " file deleted successfully", success: true }
    } catch (error) {
        return { message:error.message, success: true }
    }
}

module.exports = DeleteImage