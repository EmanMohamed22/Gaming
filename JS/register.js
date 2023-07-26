// global----------//

const inputs = document.querySelectorAll("input");
const btnRegister = document.getElementById('btnRegister')
const registForm =document.querySelector('form')
//start=-----------//







//events----------//

registForm.addEventListener("submit",function(e){
e.preventDefault();
setForm()
})


registForm.addEventListener("input",function(){
    if( validateName() && validateEmail() && validatePassword() && validateRepassword() && validatePhone()){
       console.log("ok");
       btnRegister.removeAttribute("disabled");
    }else{
        btnRegister.addAttribute("disabled");
    }
   
})
//functions-------//


function setForm() {
   const userData={
     name:inputs[0].value,
     email:inputs[1].value,
     password:inputs[2].value,
     rePassword:inputs[3].value,
     Phone:inputs[4].value
    }
    console.log(userData);
    registerForm(userData)
}

async function registerForm(user) {
    const api = await fetch('https://route-ecommerce.onrender.com/api/v1/auth/signup',{
        method:'post',
        body:JSON.stringify(user),
        headers:{
            Accept: 'application.json',
            'Content-Type': 'application/json'
        }
    })
    const response = await api.json();
    if (response.message =="success") {
        location.href = "./index.html"
    } else {
        document.getElementById("error").innerHTML = response.message
    }
    console.log(response);
}



// validation---------//
function validateName(){
    const nameRejx = /^[a-zA-Z]{2,20}$/
    if (nameRejx.test(inputs[0].value)) {
        inputs[0].classList.add('is-valid');
        inputs[0].classList.remove('is-invalid');
        return true

    }else{
        
        inputs[0].classList.add('is-invalid');
        inputs[0].classList.remove('is-valid');
        return false
    }
    
}
function validateEmail(){
    const emailRejx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (emailRejx.test(inputs[1].value)) {
        inputs[1].classList.add('is-valid');
        inputs[1].classList.remove('is-invalid');
        return true;

    }else{
        
        inputs[1].classList.add('is-invalid');
        inputs[1].classList.remove('is-valid');
        return false;
    }
    
}
function validatePassword(){
    const passwordRejx = /^[0-9]{6,20}$/
    if (passwordRejx.test(inputs[2].value)) {
        inputs[2].classList.add('is-valid');
        inputs[2].classList.remove('is-invalid');
        return true

    }else{
        
        inputs[2].classList.add('is-invalid');
        inputs[2].classList.remove('is-valid');
        return false
    }
    
}
function validateRepassword(){
    
    if (inputs[3].value== inputs[2].value) {
        inputs[3].classList.add('is-valid');
        inputs[3].classList.remove('is-invalid');
        return true

    }else{
        
        inputs[3].classList.add('is-invalid');
        inputs[3].classList.remove('is-valid');
        return false
    }
    
}
function validatePhone(){
    const nameRejx = /^01[0125][0-9]{8}$/;
    if (nameRejx.test(inputs[4].value)) {
        inputs[4].classList.add('is-valid');
        inputs[4].classList.remove('is-invalid');
        return true

    }else{
        
        inputs[4].classList.add('is-invalid');
        inputs[4].classList.remove('is-valid');
        return false
    }
    
}