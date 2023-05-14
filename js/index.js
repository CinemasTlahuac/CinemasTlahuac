// @ts-nocheck
import {
    getDocument
} from './init.js';

// Create a variable to store the ID of the document you want to read
const id = 'rIPKhCUAJKP4ALnbOIaB';

// Call the getDocument function
const docRef = await getDocument('Pelicula', id);

// Access the data in the document
const nombre = docRef.data().nombre;
const sinopsis = docRef.data().sinopsis;

// Obtain the corresponding tags via ID
document.getElementById("movie-titulo").innerHTML = nombre;
document.getElementById("movie-descripcion").innerHTML = sinopsis;

// console.log(`Title: ${nombre}`);
// console.log(`Year: ${sinopsis}`);


