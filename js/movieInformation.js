    // Extract the query parameter value
    const urlParams = new URLSearchParams(window.location.search);
    const peliculaId = urlParams.get('peliculaId');

    // Set the value as the content of the span tag
    const spanElement = document.getElementById('peliculaId');
    spanElement.textContent = peliculaId;
    console.log(spanElement);

    // @ts-nocheck
import {
    saveDocument,
    getDocument,
    getDocuments,
    onGetDocuments,
    deleteDocuments,
    updateDocument
} from '../../js/init.js';

const listContainer = document.getElementById('list-container');
let editStatus = false;
let id = '';
