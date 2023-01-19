import Todos from '../models/todos.js';
import User from '../models/todos.js';
import { validationResult } from 'express-validator';

export const createTodo = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
            const error = errors.array()[0].msg
            req.flash('error',error);
            res.redirect('/');
    }else{
        try{
            const todo = new Todos(req.body);
            todo.owner = req.user._id;
            await todo.save();
            req.flash('success','successfully create todo');
            res.redirect('/');
        }catch(err){
            next(err);
        }
    }
        
};

export const fetchTodos = async(req,res,next) =>{
        try{
            let userTodos;
            if(req.user){
                userTodos = await Todos.find({owner: req.user._id});
                if(userTodos.length === 0){
                    userTodos = 'Todos not Found';
                }
            }else{
                userTodos = 'For Create Todos You must be Login';
            }
          
          res.render('home',{
            todos: userTodos,
          })
        }catch(err){
            next(err);
        }
}

export const updateTodosPage = async(req,res,next) =>{
        try{
            const todo = await Todos.findById(req.params.id);
            res.render('update',{todo});
        }
        catch(err){
            next(err)
        }
}

export const updateTodos = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = errors.array()[0].msg
        req.flash('error',error);
        res.redirect(`/${req.params.id}`);
    }else{
        try{
            req.body.owner = req.user._id;
            await Todos.findByIdAndUpdate(req.params.id,{
                '$set':req.body
            },{new:true});
            req.flash('success','successfully update todo');
            res.redirect('/');
        }catch(err){
            next(err);
        }
    }
    
}

export const deleteTodo = async(req,res,next) =>{
    try{
        await Todos.findByIdAndDelete(req.params.id);
        req.flash('success','successfully delete todo');
        res.redirect('/')
    }catch(err){
        next(err);
    }
}