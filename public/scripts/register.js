// define input and validation Value's 
const username = document.querySelector('#username');
let validateUsername = false;
const email = document.querySelector('#email');
let validateEmail = false;
const password = document.querySelector('#password');
let validatePassword = false;


//username validation
username.addEventListener('keyup',function(){
    let usernameError = document.querySelector('#nameError');
    if(username.value.length === 0){
        usernameError.innerHTML = 'username is required';
        usernameError.style.color = '#ff0f0f';
        //username pattern
    }else if(!username.value.match('^[A-Za-z0-9]{3,20}$')){
        usernameError.innerHTML = 'username must between 3 and 20 ';
        usernameError.style.color = '#ff0f0f';
    }else{
        usernameError.innerHTML = 'this is valid syntax';
        usernameError.style.color = '#056608';
        validateUsername = true;
    }
});

//email validation
email.addEventListener('keyup',function(){
    let emailError = document.querySelector('#emailError');
    if(email.value.length === 0){
        usernameError.innerHTML = 'email is required';
        emailError.style.color = '#ff0f0f';
        //email regex
    }else if(!email.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
        emailError.innerHTML = 'email must be valid ';
        emailError.style.color = '#ff0f0f';
    }else{
        emailError.innerHTML = 'this is valid syntax';
        emailError.style.color = '#056608';
        validateEmail = true;
    }
});

//password validation
password.addEventListener('keyup',function(){
    let passwordError = document.querySelector('#passwordError');
    if(password.value.length === 0){
        passwordError.innerHTML = 'password is required';
        passwordError.style.color = '#ff0f0f';
        //password regex
    }else if(!password.value.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{6,64}$')){
        passwordError.innerHTML = 'password should be 6-64 characters and include 1 letter,1 number and 1 special character';
        passwordError.style.color = '#ff0f0f';
    }else{
        passwordError.innerHTML = 'this is valid syntax';
        passwordError.style.color = '#056608';
        validatePassword = true;
    }
});


//all input values validation before submit
const validateForm = () =>{
    if(!validateUsername || !validateEmail || !validatePassword){
        const alert = document.querySelector('#alert');
        alert.innerHTML = 'please submit after fix all errors';
        alert.style.color = '#ff0f0f';
        setTimeout(function(){
            alert.style.display = 'none';
        },3000);

        return false;
    }

    return true;
};

