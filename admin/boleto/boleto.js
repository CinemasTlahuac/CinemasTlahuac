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
const listFunciones = document.getElementById('funcion');
let selectedFuncionOptionValue = '1';

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async() => {

    //FUNCIONES
    listFunciones.addEventListener("change", () => {
        selectedFuncionOptionValue = listFunciones.options[listFunciones.selectedIndex].value;
        console.log(selectedFuncionOptionValue)
    });

    onGetDocuments('Funcion', (querySnapshot) => {

        let htmlFuncion = "";

        querySnapshot.forEach((doc) => {
            const option = doc.data();
            htmlFuncion += `
                <option id="fk_idFuncion" value="${option.idFuncion}">${option.descripcion}</option>
            `;
        });
        listFunciones.innerHTML = htmlFuncion;
    })

    onGetDocuments('Boleto', (querySnapshot) => {

        let html = "";

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            html += `
                <div class="row">
                    <div class="col">${item.idBoleto}</div>
                    <div class="col">${item.descripcion}</div>
                    <div class="col">${item.precio}</div>
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
                deleteDocuments('Boleto', dataset.id);
                console.log(dataset.id)
            })
        });

        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async(e) => {
                const doc = await getDocument('Boleto', e.target.dataset.id);
                const item = doc.data();

                addForm["idBoleto"].value = item.idBoleto;
                addForm["descripcion"].value = item.descripcion;
                addForm["fechaCompra"].value = item.fechaCompra;
                addForm["funcion"].value = selectedFuncionOptionValue;
                addForm["precio"].value = item.precio;

                editStatus = true;
                id = doc.id;

                document.getElementById('btn-save').value = "Modificar";
            })
        })
    });
});

listFunciones.addEventListener("change", () => {
    const selectedFuncionOptionValue = listFunciones.options[listFunciones.selectedIndex].value;
    console.log(selectedFuncionOptionValue)
    return selectedFuncionOptionValue;
})

document.getElementById("btn-save").addEventListener('click', (e) => {
    e.preventDefault()

    const idBoleto = addForm['idBoleto'];
    const descripcion = addForm['descripcion'];
    const fechaCompra = addForm['fechaCompra'];
    const optionsFuncion = addForm['funcion'];
    const selectedFuncion = optionsFuncion.selectedIndex;
    const precio = addForm['precio'];

    if (!editStatus) {

        saveDocument(
            'Boleto', {
                idBoleto: idBoleto.value,
                descripcion: descripcion.value,
                fechaCompra: fechaCompra.value,
                fk_idFuncion: selectedFuncionOptionValue,
                precio: precio.value
            });
    } else {
        updateDocument(
            'Boleto',
            id, {
                idBoleto: idBoleto.value,
                descripcion: descripcion.value,
                fechaCompra: fechaCompra.value,
                fk_idFuncion: selectedFuncionOptionValue,
                precio: precio.value
            });

        document.getElementById('btn-save').value = "Registrar";
        editStatus = false;
    }

    addForm.reset();
});

document.getElementById("btn-clean").addEventListener('click', (e) => {
    e.preventDefault();

    var idBoleto = document.getElementById("idBoleto");
    var descripcion = document.getElementById("descripcion");
    var fechaCompra = document.getElementById("fechaCompra");
    var fk_idFuncion = document.getElementById("fk_idFuncion");
    var precio = document.getElementById("precio");

    if (!editStatus) {
        idBoleto.value = "";
        descripcion.value = "";
        fechaCompra.value = "";
        fk_idFuncion.value = "";
        precio.value = "";
    } else {
        idBoleto.value = "";
        descripcion.value = "";
        fechaCompra.value = "";
        fk_idFuncion.value = "";
        precio.value = "";

        editStatus = false;
        document.getElementById('btn-save').value = "Registrar";
    }
});