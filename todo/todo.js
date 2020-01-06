const db = require('../db');

let todos = [
]
function addTodo(todo){
    const newTodo = new db.Todo(todo);
    return newTodo.save();
}
function editTodo(id, name, description){
    return db.Todo.update({_id:id},{ name, description });


    // let todo=todos.find(function(todo){
    //     return todo.id==id;
    // });
    // todo.name = name;
    // todo.description = description;
    // return todos;
}
function getTodo(){
    return db.Todo.find({}).sort({ name: 'asc' });
}
function deleteTodo(id){
    return db.Todo.deleteOne({_id:id});
    // todos=todos.filter(function(todo){
    //     return todo.id!=id;
    // });
    // return todos;
}
var name="todo";
exports.addTodo =addTodo;
exports.getTodo =getTodo;
exports.deleteTodo =deleteTodo;
exports.name =name;
exports.editTodo = editTodo;