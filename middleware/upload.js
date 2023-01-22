const multer = require('multer')
const express = require('express')

const app = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

// const imageFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only images.", false);
//   }
// };

const upload = multer({
  limits: {
    fileSize: '5MB'  
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(`Invalid file type. Only jpg, png and jpeg image files are allowed.`,false)
      // return cb(new Error('Please upload a valid image file'))
    }
    cb(undefined, true)
  },
  storage: storage
  // fileFilter: imageFilter
})


module.exports = upload