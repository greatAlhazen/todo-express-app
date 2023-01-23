import User from "../models/user.js";
import crypto from "crypto";
import sendEmail from '../config/sendmail.js';


export const registerPage = (req, res) => {
  res.render("register");
};

export const loginPage = (req, res) => {
  res.render("login");
};

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const signedUser = await User.register(user, password);
    req.login(signedUser, (err) => {
      if (err) return next(err);
      req.flash("success", "successfuly register");
      res.redirect("/");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/auth/signup");
  }
};

export const signin = (req, res) => {
  req.flash("success", "Welcome");
  res.redirect("/");
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "see you later again");
    res.redirect("/");
  });
};

export const forgetPage = (req, res) => {
  res.render("forget");
};

export const forgetPost = async (req, res, next) => {
  try {
    //create token
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        req.flash("error", "something went wrong");
        res.redirect("/auth/forget");
      } else {
        const token = buffer.toString("hex");

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
          req.flash("error", "No account found");
          res.redirect("/auth/forget");
        }else{

          ///save token in database
            user.passwordResetToken = token;
            user.passwordResetTokenExp = Date.now() + 2400000;
    
            await user.save();
            
           ///custom mail options
            const subject = 'Change password';
            const to = req.body.email;
            const html = ` <p>for password reset
            <a href=${process.env.RESET_PASSWORD_URL}/${token}>click</a>
            </p>
            `

         const result = sendEmail(to,subject,html);
         console.log(result);
          req.flash('success','Check your email');
          res.redirect('/');
            
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const resetPage = async(req,res,next) =>{
    const token = req.params.token;
    try{

      //token check
        const user = await User.findOne({
            passwordResetToken: token, 
            passwordResetTokenExp:{
            $gt: Date.now()
        }});

        if(!user){
            req.flash('error','link unexpired');
            res.redirect('/');
        }else{
            res.render('new-password');
        }
    }catch(err){
        next(err);
    }
}


