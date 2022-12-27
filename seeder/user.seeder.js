const { User } = require('../connection/db')
const bcrypt = require('bcrypt')

var newUser = new User({

    username: 'admin@admin.com',
    password:  bcrypt.hash(12345678, 15),
    fullname: 'Admin',
});
User.createUser(newUser, function (err, user) {
    if (err) throw err;
    console.log(user);
});