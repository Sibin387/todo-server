const db = require('../db');

function addTodo(todo){
    const newTodo = new db.Todo(todo);
    return newTodo.save();
}
function editTodo(id, name, description){
    return db.Todo.update({_id:id},{ name, description });
}
function getTodo(userId){
    return db.Todo.find({
    	userId
    }).sort({ name: 'asc' });
}
function getTodoById(id){
    return db.Todo.findById(id);
}
function deleteTodo(id){
    return db.Todo.deleteOne({_id:id});
}
var name="todo";
exports.addTodo =addTodo;
exports.getTodo =getTodo;
exports.deleteTodo =deleteTodo;
exports.name =name;
exports.editTodo = editTodo;
exports.getTodoById = getTodoById;