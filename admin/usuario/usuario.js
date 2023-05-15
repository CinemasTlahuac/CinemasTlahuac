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

window.addEventListener('DOMContentLoaded', async() => {

    onGetDocuments('Usuarios', (querySnapshot) => {

        let html = "";

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            html += `
                <div class="row">
                    <div class="col">${item.idUsuario}</div>
                    <div class="col">${item.nombre}</div>
                    <div class="col">${item.correo}</div>
                    <div class="col">${item.fk_idRol}</div>
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
                deleteDocuments('Usuarios', dataset.id);
                console.log(dataset.id)
            })
        });

        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async(e) => {
                const doc = await getDocument('Usuarios', e.target.dataset.id);
                const item = doc.data();

                addForm["idUsuario"].value = item.idUsuario;
                addForm["nombre"].value = item.nombre;
                addForm["apellidoP"].value = item.apellidoP;
                addForm["apellidoM"].value = item.apellidoM;
                addForm["direccion"].value = item.direccion;
                addForm["fechaNacimiento"].value = item.fechaNacimiento;
                addForm["fk_idRol"].value = item.fk_idRol;
                addForm["correo"].value = item.correo;
                addForm["pass"].value = item.pass;

                editStatus = true;
                id = doc.id;
                document.getElementById('btn-save').innerText = "Modificar";
            })
        })
    });
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const idUsuario = addForm['idUsuario'];
    const nombre = addForm['nombre'];
    const apellidoP = addForm['apellidoP'];
    const apellidoM = addForm['apellidoM'];
    const direccion = addForm['direccion'];
    const fechaNacimiento = addForm['fechaNacimiento'];
    const fk_idRol = addForm['fk_idRol'];
    const correo = addForm['correo'];
    const pass = addForm['pass'];

    if (!editStatus) {
        saveDocument('Usuarios', {
            idUsuario: idUsuario.value,
            nombre: nombre.value,
            apellidoP: apellidoP.value,
            apellidoM: apellidoM.value,
            direccion: direccion.value,
            fechaNacimiento: fechaNacimiento.value,
            fk_idRol: fk_idRol.value,
            correo: correo.value,
            pass: pass.value
        });
    } else {
        updateDocument(
            'Usuarios',
            id, {
                idUsuario: idUsuario.value,
                nombre: nombre.value,
                apellidoP: apellidoP.value,
                apellidoM: apellidoM.value,
                direccion: direccion.value,
                fechaNacimiento: fechaNacimiento.value,
                fk_idRol: fk_idRol.value,
                correo: correo.value,
                pass: pass.value
            });
        editStatus = false;
    }

    addForm.reset();
});