import Todos from '../models/todos.js';
import User from '../models/todos.js';

export const createTodo = async(req,res,next) =>{

     if(req.user){
        try{
            const todo = new Todos(req.body);
            todo.owner = req.user._id;
            await todo.save();
            res.redirect('/');
        }catch(err){
            next(err);
        }

    }else{
        req.flash('error','You are not authenticated');
        res.redirect('/auth/signin');
    };
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
          
          console.log(userTodos);
          res.render('home',{
            todos: userTodos,
          })
        }catch(err){
            next(err);
        }
}

