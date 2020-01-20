const db = require('./db');

function createUser(todo){
    const newUser = new db.User(todo);
    return newUser.save();
}

exports.createUser =createUser;