import {
  saveDocument,
  getDocument,
  getDocuments,
  onGetDocuments,
} from './init.js';

var urlParams = ""
var funcionId = ""
const addForm = document.getElementById('add-form');
let editStatus = false;


// Extract the query parameter value
urlParams = new URLSearchParams(window.location.search);
funcionId = urlParams.get('funcionId');

// Call the getDocument function
const docRef = await getDocument('Funcion', funcionId);

// Access the data in the document
var movieName = docRef.data().fk_idPelicula;
var movieDesc = docRef.data().descripcion;

// Obtain the corresponding tags via ID
document.getElementById("movieName").innerHTML = movieName;
document.getElementById("movieDesc").innerHTML = movieDesc;

function getCurrentDateTime() {
  var now = new Date();
  return now;
}

var seatId = 0;
const container = document.querySelector('.seats');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;
var totalPrices ="";

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  seatId = seatsIndex;

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //copy selected seats into arr
  // map through array
  //return new array of indexes

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  totalPrices = total.textContent
}

// get data from localstorage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = 50;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// intial count and total
updateSelectedCount();

document.getElementById("factorizar").addEventListener('click', (e) => {
  e.preventDefault()

  movieName
  movieDesc 

  var currentDateTime = getCurrentDateTime();
  var dateString = currentDateTime.toString();


  if (!editStatus) {
      saveDocument('Boleto', {
          fk_idFuncion: movieName,
          fechaCompra: dateString,
          precio: totalPrices,
          idAsiento: seatId,
          descripcion: movieDesc
      });
  } else {
     console.log("Error al almacenar")
  }
});