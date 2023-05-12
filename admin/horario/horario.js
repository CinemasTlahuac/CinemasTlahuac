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

    onGetDocuments('Horario', (querySnapshot) => {

        let html = "";

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            html += `
                <div class="row">
                    <div class="col">${item.idHorario}</div>
                    <div class="col">${item.horaInicio}</div>
                    <div class="col">${item.horaFin}</div>
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
                deleteDocuments('Horario', dataset.id);
                console.log(dataset.id)
            })
        });

        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async(e) => {
                const doc = await getDocument('Horario', e.target.dataset.id);
                const item = doc.data();

                addForm["idHorario"].value = item.idHorario;
                addForm["horaInicio"].value = item.horaInicio;
                addForm["horaFin"].value = item.horaFin;

                editStatus = true;
                id = doc.id;

                document.getElementById('btn-save').innerText = "Modificar";
            })
        })
    });
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const idHorario = addForm['idHorario'];
    const horaInicio = addForm['horaInicio'];
    const horaFin = addForm['horaFin'];

    if (!editStatus) {
        saveDocument('Horario', {
            idHorario: idHorario.value,
            horaInicio: horaInicio.value,
            horaFin: horaFin.value
        });
    } else {
        updateDocument(
            'Horario',
            id, {
                idHorario: idHorario.value,
                horaInicio: horaInicio.value,
                horaFin: horaFin.value
            });
        editStatus = false;
    }

    addForm.reset();
});