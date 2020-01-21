const db = require('./db');

function createUser(user){
    const newUser = new db.User(user);
    return newUser.save();
}
function checkUserExists(email){
    return db.User.findOne({email:email});
}

exports.createUser =createUser;
exports.checkUserExists =checkUserExists;