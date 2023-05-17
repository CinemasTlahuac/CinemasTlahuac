// @ts-nocheck

import {
    SignUp,
    Login,
    SignOut,
    stateChanged,
    googleAuth,
    saveDocument
} from "./init.js";

const signupForm = document.querySelector('#signup-form');
const signinForm = document.querySelector('#login-form');
const logout = document.querySelector('#logout');
const googleLogin = document.querySelector('#googleLogin');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

//REGISTRARSE
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
    const nombre = document.querySelector('#nombre').value;
    const apellidoP = document.querySelector('#apellidoP').value;
    const apellidoM = document.querySelector('#apellidoM').value;
    const fechaNacimiento = document.querySelector('#fechaNacimiento').value;
    const direccion = document.querySelector('#direccion').value;

    SignUp(email, password);

    saveDocument('Usuarios', {
        idUsuario: '',
        correo: email,
        password: password,
        nombre: nombre,
        apellidoP: apellidoP,
        apellidoM: apellidoM,
        fechaNacimiento: fechaNacimiento,
        direccion: direccion,
        fk_idRol: '3'
    });

    signupForm.reset();
    $('#signupModal').modal('hide')
})

//INICIAR SESIÓN
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    Login(email, password);
    signinForm.reset();
    $('#loginModal').modal('hide')
})

//LOGOUT
logout.addEventListener('click', (e) => {
    e.preventDefault();
    SignOut();
})

//GOOGLE LOGIN
googleLogin.addEventListener('click', (e) => {
    googleAuth();
});

let flag = document.addEventListener("DOMContentLoaded", stateChanged());

const loginCheck = (flag) => {
    if (flag == null) {
        loggedInLinks.forEach(link => link.style.display = 'block');
        loggedOutLinks.forEach(link => link.style.display = 'none');
        console.log("mostrar logueado")
    } else {
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggedOutLinks.forEach(link => link.style.display = 'block');
        console.log("no mostrar logueado")
    }
}
