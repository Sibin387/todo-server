const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')

const todo = require('./todo/todo');
const user = require('./user');

const app = express();

app.use(cors({
    origin:'http://localhost:4200',
    credentials: true
}));

app.use(session({
   secret: 'keyboard cat'
}))

app.use(bodyParser.json());

var myLogger1 = function (req, res, next) {
    console.log("myLogger1",req.body);
    next()
}
var myLogger2 = function (req, res, next) {
    console.log("myLogger2",req.body);
    next()
}
const auth = function (req, res, next) {
    if(req.session.user){
        return next();
    }else{
        res.status(401).json({message:"Please login"})
    }
}
app.use(myLogger1);
app.use(myLogger2);



const port = 3000;

app.get('/', auth, function(req,res){
    todo.getTodo(req.session.user._id)
    .then(todos=>{
        res.json(todos);
    })
})

app.post('/create',  auth,function(req,res){
    let data = req.body;
    data.userId = req.session.user._id;
    todo.addTodo(data)
    .then(data=>{
        res.json(data);
    });
})

app.post('/login', function(req,res){
    user.checkLogin(req.body.email,req.body.password)
    .then(data=>{
        if(data){
            req.session.user = data;
            res.json({message:"Logged in", user: data})
        }else{
            res.status(422).json({message:"Invalid credentials"})
        }
    });
})
app.post('/register', function(req,res){
    user.checkUserExists(req.body.email)
    .then(data=>{
        if(data){
            return res.status(422).json({message:"User already exists"});
        }
        user.createUser(req.body)
        .then(data=>{
            req.session.user = data;
            res.json({message:"Registration successful", user: data});
        });
    })
})
app.put('/edit/:id',  auth,function(req,res){
    todo.editTodo(req.params.id,req.body.name,req.body.description)
    .then(data=>{
        res.json(data);
    })
})

app.delete('/delete/:id',  auth,function(req,res){
    const id = req.params.id;
    todo.deleteTodo(id).then(data=>{
        res.json(data);
    });
})

app.get('/todo/:id',  auth,function(req,res){
    todo.getTodoById(req.params.id)
    .then(data=>res.json(data));
})

app.listen(port, function(){
    console.log(`Example app listening on port ${port}!`)
})


