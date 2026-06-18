const upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lower="abcdefghijklmnopqrstuvwxyz";

const numbers="0123456789";

const symbols="!@#$%^&*()_+-=[]{}<>?";

const slider=document.getElementById("length");

slider.oninput=()=>{

document.getElementById("lengthValue").textContent=slider.value;

}

function generatePassword(){

let chars="";

if(document.getElementById("uppercase").checked) chars+=upper;

if(document.getElementById("lowercase").checked) chars+=lower;

if(document.getElementById("numbers").checked) chars+=numbers;

if(document.getElementById("symbols").checked) chars+=symbols;

let password="";

for(let i=0;i<slider.value;i++){

password+=chars.charAt(Math.floor(Math.random()*chars.length));

}

document.getElementById("password").value=password;

}

function copyPassword(){

navigator.clipboard.writeText(

document.getElementById("password").value

);

alert("Password copied.");

}

generatePassword();
