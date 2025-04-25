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

passwordInput.addEventListener('input', () => {
    const passwordValue = passwordInput.value;
    //Contraseña con al menos 5 caracteres y al menos una letra y un número
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/; // Al menos 5 caracteres, al menos una letra y un número

    
    if(passwordValue.length > 0){
        if (!passwordPattern.test(passwordValue)) {
            // Si la contraseña tiene menos de 5 caracteres
            if (passwordValue.length < 5) {
                document.getElementById('errorPassword').innerHTML = "La contraseña debe tener al menos 5 caracteres";
            }
            // Si la contraseña no tiene al menos una letra
            else if (!/[a-zA-Z]/.test(passwordValue)) {
                document.getElementById('errorPassword').innerHTML = "La contraseña debe tener al menos una letra";
            }
            // Si la contraseña no tiene al menos un número
            else if (!/\d/.test(passwordValue)) {
                document.getElementById('errorPassword').innerHTML = "La contraseña debe tener al menos un número";
            }

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
    const emailValue = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Expresión regular para validar el formato del correo electrónico

    if (emailValue.length > 0) {
        if (!emailPattern.test(emailValue)) {
            // Mostrar mensaje e icono de error
            document.getElementById('errorEmail').style.display = 'block';
        }
        else {
            // Ocultar mensaje e icono de error
            document.getElementById('errorEmail').style.display = 'none';
        }
    }    
});


labelEmail = document.getElementById("labelemail")
labelPassword = document.getElementById("labelpassword")
labelUsername = document.getElementById("labelusername")
const usernameInput = document.getElementById('nombre');

labelEmail.addEventListener('click', () => {
    emailInput.focus = true
});

labelPassword.addEventListener('click', () => {
    passwordInput.focus = true
});

labelUsername.addEventListener('click', () => {
    usernameInput.focus = true
});
