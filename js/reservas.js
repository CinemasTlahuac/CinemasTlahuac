// @ts-nocheck
import {
    getDocument, onGetDocuments

} from './init.js';

var urlParams = ""
var peliculaId = ""

// Extract the query parameter value
    urlParams = new URLSearchParams(window.location.search);
    peliculaId = urlParams.get('peliculaId');

// Call the getDocument function
const docRef = await getDocument('Pelicula', peliculaId);

// Access the data in the document
var nombre = docRef.data().nombre;
var clasificacion = docRef.data().clasificacion;
var director = docRef.data().director;
var duracion = docRef.data().duracion;
var genero = docRef.data().genero;
var urlImagen = docRef.data().urlImagen;
var idPelicula = docRef.data().idPelicula;

// Obtain the corresponding tags via ID
document.getElementById("titulo").innerHTML = nombre;
document.getElementById("clasificacion").innerHTML = clasificacion;
document.getElementById("director").innerHTML = director;
document.getElementById("duracion").innerHTML = duracion;
document.getElementById("genero").innerHTML = genero;

const newImg = document.getElementById("img-url");
newImg.src = urlImagen;

// const mainmovie = document.getElementById("btn-ref")
// const newLink = document.getElementById("newLink")

// mainmovie.addEventListener("click",  async(e) => {
// newLink.href = 'reserva.html?peliculaId='+encodeURIComponent(peliculaId);
// })

const divElement = document.getElementById('horarioFunciones');
let idHorario = "";
let editStatus = false;

onGetDocuments("Funcion", (querySnapshot) => {

    let html = "";

    // Loop through each document in the snapshot
    querySnapshot.forEach((doc) => {
        const item = doc.data();
        // Retrieve the "urlImagen" field from the document and log it to the console
        if(item.fk_idPelicula == idPelicula ){ //
            idHorario = item.fk_idHorario //idHorario is 5

            onGetDocuments("Horario", (querySnapshot) => {
            
                querySnapshot.forEach((doc) => {
                    const horaId = doc.data();
                    if(horaId == idHorario){
                        html += `
                        <button class="button" id="horario"><a href="">${horaId.horaInicio} "-" ${horaId.horaFin}</a></button>
                        `;
            
                    divElement.innerHTML = html;
                    }//second if end
                    else{console.log("No existe horarios")}

                }); //end of for each for funcion
            });

        } else {
            console.log("No existe horarios")
        }
    }); //end for first forEach

}); //end of ongetdocuments
