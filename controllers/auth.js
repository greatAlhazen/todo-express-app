import User from '../models/user.js';


export const registerPage = (req,res) =>{
    res.render('register');
};

export const loginPage = (req,res) =>{
    res.render('login');
};


export const signup = async(req,res,next) =>{
    try{
        const {username,email,password} = req.body;
        const user = new User({email,username});
        const signedUser = await User.register(user,password);
        req.flash('success','successfuly register');
        res.redirect('/');
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/auth/signup');
    }

};

export const signin =(req,res) =>{
    req.flash('success','Welcome');
    res.redirect('/');
}

export const logout = (req,res) =>{
    req.logout();
    req.flash('success','see you later again');
    res.redirect('/');
}

