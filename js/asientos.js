import {
  saveDocument,
  getDocument
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

var seatId = 0;
const container = document.querySelector('.seats');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
var fechaFuncion = document.getElementById("fechaFuncion");
var asientosFuncion = document.getElementById("asientosFuncion");
var salaFuncion = document.getElementById("salaFuncion");
const contenedorQR = document.getElementById('contenedorQR');
const asientos = document.querySelectorAll('.seat');

// Generar fecha
const date = new Date();
const localDate = date.toLocaleDateString();
fechaFuncion.innerHTML = localDate;

// Generar folio
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

// Check if the random string exists in localStorage
let randomString = localStorage.getItem('randomString');

if (!randomString) {
  // Generate a new random string
  randomString = generateRandomString(10);
  localStorage.setItem('randomString', randomString);
}

console.log(randomString);

populateUI();
let ticketPrice = +movieSelect.value;
var totalPrices ="";
var totalAsientos =0;

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
  totalAsientos = count.textContent;

  total.innerText = selectedSeatsCount * ticketPrice;
  totalPrices = total.textContent;

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
    seatId;
    console.log(seatId);
    //establecer asientos selecionados
    asientoSelecionado.innerHTML = seatId;
  }
});

// intial count and total
updateSelectedCount();

//DISPLAY MOVIE TICKET
console.log(movieName);
console.log(totalPrices);
console.log(seatId);
console.log(movieDesc);


// Access the data in the document
var movieName = docRef.data().fk_idPelicula;
var movieDesc = docRef.data().descripcion;
var movieHorario = docRef.data().fk_idHorario;
var movieSala = docRef.data().fk_idSala;
var movieSala = docRef.data().fk_idSala;
var movieAsientos = docRef.data().numeroAsientos;

// LLenar los asientos
console.log(movieAsientos);
function valoresAsientosDeBD(movieAsientos) {

  for (var i = 0; i < asientos.length; i++) {
    var seat = asientos[i];
    var seatClass = movieAsientos[i]; // Assuming the index of movieAsientos corresponds to the index of asientos

    seat.classList.add(seatClass);
  }
  
}

valoresAsientosDeBD(movieAsientos);


// Obtain the corresponding tags via ID
document.getElementById("movieName").innerHTML = movieName;
document.getElementById("movieDesc").innerHTML = movieDesc;
document.getElementById("horarioFuncion").innerHTML = movieHorario;
salaFuncion.innerHTML = movieSala;


document.getElementById("factorizar").addEventListener('click', (e) => {
  e.preventDefault()

  movieName
  movieDesc 

  //MOVIE TICKET INFORMATION SAVED

  if (!editStatus) {
      saveDocument('Boleto', {
          fk_idFuncion: movieName,
          precio: totalPrices,
          cantidadBoletos: totalAsientos,
          funcionHorario: movieHorario,
          funcionFecha: localDate,
          funcionSala: movieSala,
          idAsiento: seatId,
          descripcion: randomString,
          pagado: false
      });

      const Pago_Boleto = `Clave De Transferencia: 0723206076552292709
      Precio total: ${totalPrices}
      Folio: ${randomString}`;

      //QR INFORMATION
      new QRCode(contenedorQR, Pago_Boleto);
      console.log(Pago_Boleto);
  } 
  
  else {
     console.log("Error al almacenar")
  }

    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "cinemastlahuacofmx@gmail.com",
      Password : "513ABAF1AD22793FCB7D067C33DABBE39164",
      To : userGmail,
      From : "cinemastlahuacofmx@gmail.com",
      Subject : "Informacion del Pago de cuenta Interbancaria",
      Body : Pago_Boleto

      }).then(
      message => alert("Se ha enviado un la informacion Interbancaria con sus datos correspondientes")
    );

});

