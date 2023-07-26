// global----------//

const inputs = document.querySelectorAll("input");
const btnLogin = document.getElementById('btnLogin')
const logForm =document.querySelector('form')
//start=-----------//







//events----------//

logForm.addEventListener("submit",function(e){
e.preventDefault();
setForm()
})


logForm.addEventListener("input",function(){
    if( validateEmail() && validatePassword()){
       console.log("ok");
       btnLogin.removeAttribute("disabled");
    }else{
        btnLogin.addAttribute("disabled");
    }
   
})
//functions-------//


function setForm() {
   const userData={
     email:inputs[0].value,
     password:inputs[1].value,
    }
    console.log(userData);
    loginForm(userData)
}

async function loginForm(user) {
    const api = await fetch('https://route-ecommerce.onrender.com/api/v1/auth/signin',{
        method:'post',
        body:JSON.stringify(user),
        headers:{
            Accept: 'application.json',
            'Content-Type': 'application/json'
        }
    })
    const response = await api.json();
    if (response.message =="success") {
        localStorage.setItem("token",response.token);
        location.href = "./home.html";
    } else {
        document.getElementById("error").innerHTML = response.message
    }
    console.log(response);
}



// validation---------//

function validateEmail(){
    const emailRejx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (emailRejx.test(inputs[0].value)) {
        inputs[0].classList.add('is-valid');
        inputs[0].classList.remove('is-invalid');
        return true;

    }else{
        
        inputs[0].classList.add('is-invalid');
        inputs[0].classList.remove('is-valid');
        return false;
    }
    
}
function validatePassword(){
    const passwordRejx = /^[0-9]{6,20}$/
    if (passwordRejx.test(inputs[1].value)) {
        inputs[1].classList.add('is-valid');
        inputs[1].classList.remove('is-invalid');
        return true

    }else{
        
        inputs[1].classList.add('is-invalid');
        inputs[1].classList.remove('is-valid');
        return false
    }
    
}
