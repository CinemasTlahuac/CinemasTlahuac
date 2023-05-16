// @ts-nocheck
import {
    saveDocument,
    getDocument,
    getDocuments,
    onGetDocuments,
    deleteDocuments,
    updateDocument
} from '../../js/init.js';

const addForm = document.getElementById('add-form');
const listContainer = document.getElementById('list-container');
let editStatus = false;
let id = '';
var files = [];
var reader = new FileReader();

var namebox = document.getElementById('namebox');
var extlab = document.getElementById('extlab');
var myimg = document.getElementById('myimg');
var proglab = document.getElementById('unprogress');
var Selectbtn = document.getElementById('Selectbtn');
var Uploadbtn = document.getElementById('btn-save');
var Downbtn = document.getElementById('Downbtn');

var input = document.createElement('input');
input.type = 'file';

window.addEventListener('DOMContentLoaded', async() => {

    onGetDocuments('Pelicula', (querySnapshot) => {

        let html = "";

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            html += `
                <div class="row">
                    <div class="col">${item.idPelicula}</div>
                    <div class="col">${item.nombre}</div>
                    <div class="col">${item.duracion}</div>
                    <div class="col">
                        <button class='btn-edit' data-id="${doc.id}">Modificar</button>
                        <button class='btn-delete' data-id="${doc.id}">Eliminar</button>
                    </div>
                </div>
            `;
        });

        listContainer.innerHTML = html;

        const btnsDelete = listContainer.querySelectorAll('.btn-delete');
        const btnsEdit = listContainer.querySelectorAll('.btn-edit');

        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                deleteDocuments('Pelicula', dataset.id);
                console.log(dataset.id)
            })
        });

        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async(e) => {
                const doc = await getDocument('Pelicula', e.target.dataset.id);
                const item = doc.data();

                //COMPLETAR
                addForm["idPelicula"].value = item.idPelicula;
                addForm["nombre"].value = item.nombre;
                addForm["genero"].value = item.genero;
                addForm["clasificacion"].value = item.clasificacion;
                addForm["director"].value = item.director;
                addForm["reparto"].value = item.reparto;
                addForm["sinopsis"].value = item.sinopsis;
                addForm["urlTrailer"].value = item.urlTrailer;
                addForm["duracion"].value = item.duracion;
                addForm["esEstreno"].value = item.esEstreno;
                addForm["activo"].value = item.activo;

                editStatus = true;
                id = doc.id;

                document.getElementById('btn-save').value = "Modificar";
            })
        })
    });
});

document.getElementById("btn-save").addEventListener('click', (e) => {
    e.preventDefault()

    const idPelicula = addForm["idPelicula"];
    const nombre = addForm["nombre"];
    const genero = addForm["genero"];
    const clasificacion = addForm["clasificacion"];
    const director = addForm["director"];
    const reparto = addForm["reparto"];
    const sinopsis = addForm["sinopsis"];
    const urlTrailer = addForm["urlTrailer"];
    const duracion = addForm["duracion"];
    const esEstreno = addForm["esEstreno"];
    const activo = addForm["activo"];

    if (!editStatus) {
        saveDocument('Pelicula', {
            idPelicula: idPelicula.value,
            nombre: nombre.value,
            genero: genero.value,
            clasificacion: clasificacion.value,
            director: director.value,
            reparto: reparto.value,
            sinopsis: sinopsis.value,
            urlTrailer: urlTrailer.value,
            duracion: duracion.value,
            esEstreno: esEstreno.value,
            activo: activo.value
        });
    } else {
        updateDocument(
            'Pelicula',
            id, {
                idPelicula: idPelicula.value,
                nombre: nombre.value,
                genero: genero.value,
                clasificacion: clasificacion.value,
                director: director.value,
                reparto: reparto.value,
                sinopsis: sinopsis.value,
                urlTrailer: urlTrailer.value,
                duracion: duracion.value,
                esEstreno: esEstreno.value,
                activo: activo.value
            });

        document.getElementById('btn-save').value = "Registrar";
        editStatus = false;
    }

    addForm.reset();
});

document.getElementById("btn-clean").addEventListener('click', (e) => {
    e.preventDefault();

    var idPelicula = document.getElementById("idPelicula");
    var nombre = document.getElementById("nombre");
    var genero = document.getElementById("genero");
    var clasificacion = document.getElementById("clasificacion");
    var director = document.getElementById("director");
    var reparto = document.getElementById("reparto");
    var sinopsis = document.getElementById("sinopsis");
    var urlTrailer = document.getElementById("urlTrailer");
    var duracion = document.getElementById("duracion");
    var esEstreno = document.getElementById("esEstreno");
    var activo = document.getElementById("activo");


    if (!editStatus) {
        idPelicula.value = "";
        nombre.value = "";
        genero.value = "";
        clasificacion.value = "";
        director.value = "";
        reparto.value = "";
        sinopsis.value = "";
        urlTrailer.value = "";
        duracion.value = "";
        esEstreno.value = "";
        activo.value = "";
    } else {
        idPelicula.value = "";
        nombre.value = "";
        genero.value = "";
        clasificacion.value = "";
        director.value = "";
        reparto.value = "";
        sinopsis.value = "";
        urlTrailer.value = "";
        duracion.value = "";
        esEstreno.value = "";
        activo.value = "";

        editStatus = false;
        document.getElementById('btn-save').value = "Registrar";
    }
});

//IMAGENES
input.onchange = e => {

    files = e.target.files;

    var extention = GetFileExt(files[0]); //only select one file
    var name = GetFileName(files[0]);

    namebox.value = name;
    extlab.innerHTML = extention;

    reader.readAsDataURL(files[0]);
}

reader.onload = function() {
    myimg.src = reader.result;
}

// ---------------SELECTION ----------------//

Selectbtn.onclick = function() {
    input.click();
}

function GetFileExt(file) {
    var temp = file.name.split('.');
    var ext = temp.slice((temp.length - 1), (temp.length));
    return '.' + ext[0];
}

function GetFileName(file) {
    var temp = file.name.split('.');
    var fname = temp.slice(0, -1).join('.');
    return fname;
}