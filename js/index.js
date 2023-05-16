// @ts-nocheck
import {
    getDocument,
    onGetDocuments

} from './init.js';

// Create a variable to store the ID of the document you want to read
const id = 'rIPKhCUAJKP4ALnbOIaB';

// Call the getDocument function
const docRef = await getDocument('Pelicula', id);

// Access the data in the document
const nombre = docRef.data().nombre;
const sinopsis = docRef.data().sinopsis;
const mainmovie = document.getElementById("btn-ref")
const newLink = document.getElementById("newLink")


// Obtain the corresponding tags via ID
document.getElementById("movie-titulo").innerHTML = nombre;
document.getElementById("movie-descripcion").innerHTML = sinopsis;

mainmovie.addEventListener("click",  async(e) => {
    newLink.href = 'pelicula.html?peliculaId='+encodeURIComponent(id);
})

// Carousel 
const carousel = document.getElementById('carousel');
let editStatus = false;

// Call the onGetDocuments function to retrieve all documents from the "Pelicula" collection
onGetDocuments("Pelicula", (querySnapshot) => {

    let html = "";

    // Loop through each document in the snapshot
    querySnapshot.forEach((doc) => {

        // Retrieve the "urlImagen" field from the document and log it to the console
        const item = doc.data();
        html += `
					<div class="pelicula">
                        <a href="pelicula.html?peliculaId=%20${doc.id}" id="idPelicula"><img src="${item.urlImagen}" alt=""></a>
                    </div>
            `;
        carousel.innerHTML = html;
    });

    

});