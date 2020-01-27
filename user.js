const db = require('./db');

function createUser(user){
    const newUser = new db.User(user);
    return newUser.save();
}
function checkUserExists(email){
    return db.User.findOne({email:email});
}

function checkLogin(email,password){
    return db.User.findOne({email, password});
}

exports.createUser =createUser;
exports.checkUserExists =checkUserExists;
exports.checkLogin =checkLogin;