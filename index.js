const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const todo = require('./todo/todo');

const app = express();

app.use(cors());

app.use(bodyParser.json());

var myLogger1 = function (req, res, next) {
    console.log("myLogger1",req.body);
    next()
}
var myLogger2 = function (req, res, next) {
    console.log("myLogger2",req.body);
    next()
}
app.use(myLogger1);
app.use(myLogger2);



const port = 3000;

app.get('/', function(req,res){
    todo.getTodo()
    .then(todos=>{
        res.json(todos);
    })
})

app.post('/create', function(req,res){
    todo.addTodo(req.body)
    .then(data=>{
        res.json(data);
    });
})

app.put('/edit/:id', function(req,res){
    todo.editTodo(req.params.id,req.body.name,req.body.description)
    .then(data=>{
        res.json(data);
    })
})

app.delete('/delete/:id', function(req,res){
    const id = req.params.id;
    todo.deleteTodo(id).then(data=>{
        res.json(data);
    });
})

app.get('/todo/:id',function(req,res){
    todo.getTodoById(req.params.id)
    .then(data=>res.json(data));
})

app.listen(port, function(){
    console.log(`Example app listening on port ${port}!`)
})


