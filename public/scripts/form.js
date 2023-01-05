//show password functionality
const icons = document.querySelectorAll('.password i');

icons.forEach(item =>{
    item.addEventListener('click',function(){
        if(item.classList.contains('fa-eye-slash')){
            const input = item.previousElementSibling.previousElementSibling;
            input.type = 'text'
            item.style.display = 'none';
            item.previousElementSibling.style.display = 'block';
        }else{
            const input = item.previousElementSibling;
            input.type = 'password';
            item.style.display = 'none';
            item.nextElementSibling.style.display = 'block';
        }
    })
})
