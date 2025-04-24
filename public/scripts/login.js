console.log("app.js loaded");
document.getElementById('errorEmail').style.display = 'none';
document.getElementById('errorPassword').style.display = 'none';

// Evento para ver la contraseña
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eye');

eyeIcon.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    }
    else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
});

passwordInput.addEventListener('blur', () => {
    const passwordValue = passwordInput.value;
    const passwordPattern = /^.{5,}$/; // Al menos 5 caracteres

    
    if(passwordValue.length > 0){
        if (!passwordPattern.test(passwordValue)) {
            // Mostrar mensaje e icono de error
            document.getElementById('errorPassword').style.display = 'block';
        }
        else {
            // Ocultar mensaje e icono de error
            document.getElementById('errorPassword').style.display = 'none';
        }
    }
    else{
        // Ocultar mensaje e icono de error
        document.getElementById('errorPassword').style.display = 'none';    }
});




const emailInput = document.getElementById('correo');

emailInput.addEventListener('blur', () => {
    // Comprobamos si el usuario existe con http://localhost:8000/api/usuario/user@example.com
    

    const emailValue = emailInput.value;
    const url = `http://localhost:8000/api/usuario/${emailValue}`;
    
    if(emailValue.length > 0){
    fetch(url)
        .then(response => {
            console.log(response);

            return response.json();
        })
        .then(data => {
            if (data.ok === false) {
                // Mostrar mensaje e icono de error
                document.getElementById('errorEmail').style.display = 'block';
            }
            else {
                // Ocultar mensaje e icono de error
                document.getElementById('errorEmail').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    else{
        // Ocultar mensaje e icono de error
        document.getElementById('errorEmail').style.display = 'none';
            
    }
});


labelEmail = document.getElementById("labelemail")
labelPassword = document.getElementById("labelpassword")

labelEmail.addEventListener('click', () => {
    emailInput.focus = true
});

labelPassword.addEventListener('click', () => {
    passwordInput.focus = true
});
